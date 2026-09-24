// Chạy: node tools/sheet/test-phieu-bo-sung.cjs — không chạm bản lưu trình duyệt.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, '../../ingest/phieu-bo-sung-ca-phao-3-bai.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
function boot(stored = null, failWrite = false) {
  const nodes = new Map();
  function node() {
    return { value: '', textContent: '', events: {}, classList: { toggle() {} },
      append() {}, replaceChildren() {}, focus() {}, select() {},
      addEventListener(type, fn) { this.events[type] = fn; } };
  }
  const context = vm.createContext({ Date, console, setTimeout,
    document: { getElementById(id) { if (!nodes.has(id)) nodes.set(id, node()); return nodes.get(id); }, createElement: node },
    localStorage: { getItem() { return stored; }, setItem(key, value) { if (failWrite) throw Error('quota'); stored = value; } }
  });
  vm.runInContext(script, context);
  return { run: code => vm.runInContext(code, context), nodes, stored: () => stored };
}
(async () => {
  const app = boot();
  assert.equal(app.run('all.length'), 8);
  assert.equal(app.run('new Set(all.map(q => q.id)).size'), 8);
  app.run("answers['cec-33']={status:'uncertain',text:'Cần xem lại ô 33'}; save()");
  const restored = boot(app.stored());
  assert.equal(restored.run("answers['cec-33'].text"), 'Cần xem lại ô 33');
  assert.match(restored.nodes.get('progress').textContent, /0\/5/);
  const exported = JSON.parse(restored.run('exportText()'));
  assert.equal(exported.confirmedContext.length, 3);
  assert.equal(exported.answers['cec-33'].text, 'Cần xem lại ô 33');
  assert.throws(() => restored.run("validate({formId:'other'})"));
  const corrupt = boot('{broken');
  assert.equal(corrupt.run('save()'), false);
  assert.equal(corrupt.stored(), '{broken');
  const quota = boot(null, true);
  assert.equal(quota.run('save()'), false);
  assert.match(quota.nodes.get('status').textContent, /Không lưu được/);
  const incoming = {...exported, answers: {'cec-33': {status:'answered',text:'Bản khác'}}};
  await restored.nodes.get('import-file').events.change({target:{files:[{size:500,text:async()=>JSON.stringify(incoming)}],value:'test'}});
  assert.equal(restored.run("answers['cec-33'].text"), 'Cần xem lại ô 33');
  assert.match(restored.nodes.get('status').textContent, /giữ nguyên 1/);
  console.log('PASS: 8 unique questions; save/restore; JSON; validation; corrupt/quota protection; non-overwriting import.');
})().catch(error => {console.error(error);process.exitCode=1;});
