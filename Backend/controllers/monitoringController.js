// ─────────────────────────────────────────────────────────────────────────────
//  Monitoring Controller – Prometheus, Grafana, alerts, resource metrics
// ─────────────────────────────────────────────────────────────────────────────
const Alert = require('../models/Alert');
const asyncHandler = require('../middleware/asyncHandler');
const os = require('os');

// GET /api/v1/monitoring/prometheus
exports.prometheus = asyncHandler(async (req, res) => {
  const mem = process.memoryUsage();
  const metrics = [
    `# HELP nodejs_heap_used Heap used in bytes`, `nodejs_heap_used ${mem.heapUsed}`,
    `# HELP nodejs_heap_total Heap total in bytes`, `nodejs_heap_total ${mem.heapTotal}`,
    `# HELP nodejs_rss RSS in bytes`, `nodejs_rss ${mem.rss}`,
    `# HELP process_uptime Process uptime in seconds`, `process_uptime ${process.uptime()}`,
    `# HELP os_load_average System load average`, `os_load_average{period="1m"} ${os.loadavg()[0]}`,
  ].join('\n');
  res.type('text/plain').send(metrics);
});

// GET /api/v1/monitoring/grafana
exports.grafana = asyncHandler(async (req, res) => {
  res.json({ success: true, dashboards: [
    { name: 'API Performance', url: '/grafana/api-perf', panels: ['Request Rate', 'Response Time', 'Error Rate'] },
    { name: 'System Resources', url: '/grafana/resources', panels: ['CPU', 'Memory', 'Disk'] },
    { name: 'MongoDB Metrics', url: '/grafana/mongodb', panels: ['Connections', 'Operations', 'Latency'] },
  ]});
});

// GET /api/v1/monitoring/alerts
exports.getAlerts = asyncHandler(async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 });
  res.json({ success: true, count: alerts.length, data: alerts });
});

// GET /api/v1/monitoring/uptime
exports.uptime = asyncHandler(async (req, res) => {
  res.json({ success: true, uptime: { process: process.uptime(), system: os.uptime(), startedAt: new Date(Date.now() - process.uptime() * 1000) } });
});

// GET /api/v1/monitoring/cpu
exports.cpu = asyncHandler(async (req, res) => {
  const cpus = os.cpus();
  res.json({ success: true, cpu: { cores: cpus.length, model: cpus[0]?.model, loadAverage: os.loadavg(), usage: cpus.map((c, i) => ({ core: i, ...c.times })) } });
});

// GET /api/v1/monitoring/memory
exports.memory = asyncHandler(async (req, res) => {
  const mem = process.memoryUsage();
  res.json({ success: true, memory: { process: { rss: mem.rss, heapTotal: mem.heapTotal, heapUsed: mem.heapUsed, external: mem.external }, system: { total: os.totalmem(), free: os.freemem(), used: os.totalmem() - os.freemem() } } });
});

// GET /api/v1/monitoring/network
exports.network = asyncHandler(async (req, res) => {
  const interfaces = os.networkInterfaces();
  const nets = {};
  for (const [name, addrs] of Object.entries(interfaces)) {
    nets[name] = addrs.map(a => ({ address: a.address, family: a.family, internal: a.internal }));
  }
  res.json({ success: true, network: nets });
});

// GET /api/v1/monitoring/storage
exports.storage = asyncHandler(async (req, res) => {
  const mongoose = require('mongoose');
  let dbStats = {};
  try { dbStats = await mongoose.connection.db.stats(); } catch (e) { dbStats = { error: e.message }; }
  res.json({ success: true, storage: { database: dbStats } });
});

// POST /api/v1/monitoring/alerts/create
exports.createAlert = asyncHandler(async (req, res) => {
  const alert = await Alert.create(req.body);
  res.status(201).json({ success: true, data: alert });
});

// DELETE /api/v1/monitoring/alerts/:id
exports.deleteAlert = asyncHandler(async (req, res) => {
  const alert = await Alert.findByIdAndDelete(req.params.id);
  if (!alert) { res.status(404); throw new Error('Alert not found'); }
  res.json({ success: true, message: 'Alert deleted' });
});
