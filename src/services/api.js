const API_BASE = '/api';

export const api = {
  // 健康检查
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // 获取所有孩子数据
  async getChildren() {
    const res = await fetch(`${API_BASE}/children`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error('拉取云端数据失败');
    const json = await res.json();
    return json.data;
  },

  // 保存单个孩子数据
  async updateChild(childId, childData) {
    try {
      const res = await fetch(`${API_BASE}/children/${childId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(childData),
        signal: AbortSignal.timeout(8000)
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || `更新云端档案失败 (HTTP ${res.status})`);
      return json;
    } catch (err) {
      if (err.name === 'TimeoutError') throw new Error('云端连接超时，请检查后台服务');
      throw err;
    }
  },

  // 批量全量同步
  async syncAll(childrenMap) {
    try {
      const res = await fetch(`${API_BASE}/children/sync-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(childrenMap),
        signal: AbortSignal.timeout(8000)
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || `全量同步云端失败 (HTTP ${res.status})`);
      return json;
    } catch (err) {
      if (err.name === 'TimeoutError') throw new Error('云端同步超时 (8s)');
      throw err;
    }
  }
};
