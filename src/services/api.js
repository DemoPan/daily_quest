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
    const res = await fetch(`${API_BASE}/children/${childId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(childData)
    });
    if (!res.ok) throw new Error('更新云端档案失败');
    return await res.json();
  },

  // 批量全量同步
  async syncAll(childrenMap) {
    const res = await fetch(`${API_BASE}/children/sync-all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(childrenMap)
    });
    if (!res.ok) throw new Error('全量同步云端失败');
    return await res.json();
  }
};
