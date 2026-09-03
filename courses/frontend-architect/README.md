# Frontend Architect 正式课程

这里保存可以直接学习、运行、测试和验证的正式课程。

课程设计与正式交付分开：

```text
learn-frontend-web-course/
└── 负责总纲、Stage/Module 边界、学习顺序和验收标准

courses/frontend-architect/
└── 负责逐 Lesson 教学文档、完整源码、实验和项目
```

所有正式课程都遵循 [统一教学与课程编写规范](../../learn-frontend-web-course/FRONTEND_TEACHING_GUIDE.md)。

---

## 当前可学习内容

### Stage 11：React 完整体系

- [Stage 11 正式课程入口](./stage11-react/README.md)
- [Module 11.01：React 的问题模型与声明式 UI](./stage11-react/module11-01-react-problem-model/README.md)

当前第一批课程：

1. [RE-1101-001：手工 DOM 同步为什么会失控](./stage11-react/module11-01-react-problem-model/01-manual-dom-sync-problem/README.md)
2. [RE-1101-002：创建第一个 React 应用](./stage11-react/module11-01-react-problem-model/02-first-react-application/README.md)
3. [RE-1101-003：让状态声明 UI](./stage11-react/module11-01-react-problem-model/03-state-declares-ui/README.md)

---

## 学习方式

进入任意 Lesson 后，先阅读该目录的 `README.md`，再按照顺序执行：

```text
确认起始状态
→ 安装依赖
→ 启动基线
→ 按步骤修改或观察
→ 完成故障实验
→ 构建验证
→ 完成验收问题
```

每个 Lesson 都保存完整最终源码，因此可以独立安装和运行，不需要依赖上一课目录。
