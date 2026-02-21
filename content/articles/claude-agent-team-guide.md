
💡 2026 年开年就这么刺激，Claude Code Agent Team 直接让**【每月几百拥有一支 7×24 小时开发队伍】**的梦想成真。

之前 vibe coding 是用魔法让单独一个高手给自己干活，现在有了 Agent Team，直接像擦神灯一样召唤出一支战斗力爆表的开发队伍！

话不多说，我逐帧整理了 YouTube 上关于 Agent Team 的 TOP 热点视频，带来这份来自一线前沿的实战指南 👇

来自的 Bart Slodyczka（Joolca.com 联合创始人）的youtube TOP 热播视频 youtu.be/cSkoaCCmq0w[https://youtu.be/cSkoaCCmq0w]

**本文最后还精心附上了原视频的关键内容快照。**

---

## 🎯 一句话总结

Anthropic 最新发布的 Opus 4.6 带来了一个革命性功能——**Agent Teams（代理团队）**。

这不是简单的功能介绍，而是一次**完整的实战指南**：

- 🎭 用安保公司比喻，秒懂三种工作模式
    
- ⚙️ 手把手教你配置 TMUX 分屏管理
    
- 💰 深度解析 token 成本控制策略
    
- 🛠️ 掌握优雅关闭团队的技巧
    
- 📝 将重复工作转化为可复用的 Skills
    

如果你想真正掌握这个可能**改变开发方式**的新工具，这篇文章值得逐字阅读。

---

## 🧠 三种模式的本质差异

## ![Pasted image 20260218235742.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Claude Code 现在有三种玩法，搞懂它们的区别是用好这个工具的前提：

### 🔹 模式一：Default（默认模式）

**一句话形容：** 你请了一个技术顾问，坐在会议室里一对一聊天。

**痛点在哪？**

- **会话有上限**：token 消耗到一定程度，AI 开始“失忆”，忘了之前聊过什么
    
- **“隧道视野”**：面对庞大代码库时，AI 只盯着某一块反复修改，看不见整体架构
    

> 💬 **作者原话：**  
> “模型往往会 gravitates towards one specific area，就像隧道视野，只看那一个区域。”

**现在的最佳定位：** 把它当作“系统控制面板”——选模型、看 skills、搭架构，这些管理工作在这里完成。

---

### 🔹 模式二：Sub-agent（子代理模式）

**一句话形容：** 派遣制——特工出去干活，回来只汇报结果。

作者用了一个绝妙的比喻 🏢：

> 想象你是一家安保公司，坐在高楼控制室里监控所有屏幕。
> 
> 某层楼出现警报，你派一名特工去调查。他下楼、敲门、问话、解决问题，最后回到控制室汇报：
> 
> **“搞定了，Bart 刚才乱跑，我让他坐下了。”**

**关键设计：** 你不会听到他左转右转、和五个人说了什么——**这些中间步骤被刻意省略**，只为给父会话节省 token。

**实际场景：** 你的代码只有密码登录，想加 Google 登录？派个子代理去完成，父会话的上下文不会被污染。

---

### 🔹 模式三：Agent Teams（代理团队模式）⭐重点

**一句话形容：** 真正的团队协作——一支有领导、有分工、能实时沟通的 AI 队伍。

还是安保公司的比喻 🏙️：

> 这次不是处理单一警报，而是要为一场活动**确保整栋楼的安全**。
> 
> 你需要一支真正的队伍：
> 
> - 👨‍💼 **团队领导**：理解任务，制定计划，分配工作
>     
> - 👷 **左边队员**：负责左侧三层
>     
> - 👷 **右边队员**：负责右侧三层
>     
> 
> 更重要的是——他们可以通过对讲机实时沟通：
> 
> 🎙️ _“六楼有人搞破坏，正往楼下走，A 队员准备拦截！”_

**![Pasted image 20260219000614.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)**

**为什么这种模式强大？**

每个代理虽然仍有“视角局限”，但多个代理同时工作：

- 一个看左边 👈
    
- 一个看右边 👉
    
- 一个从高处俯视 👆
    

团队领导整合所有视角，最终给你一份 **360 度全方位报告**。

---

## ⚙️ 环境配置与 TMUX

### 为什么要配置 TMUX？

想象一下：五个面试者在同一个房间里同时回答你的问题 😵‍💫

**太吵了！根本听不清谁在说什么。**

TMUX 的作用就是给每个代理创建**独立的终端窗口**，就像给每个人分配一间单独的房间。

![Pasted image 20260219002602.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Pasted image 20260219001245.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 📝 配置步骤（超简单）

**Step 1：** 安装 TMUX（Mac 用户直接用 Homebrew）

**Step 2：** 修改 Claude Code 配置文件，加两行：

- 1
    
- 2
    

```
tmux.split_panes: true# 启用分屏
```

💡 **建议设为全局配置**，这样每次启动新会话都不用重新配。

### ⚠️ 关键顺序（很多人踩坑）

**先启动 TMUX 会话 → 再启动 Claude Code**

顺序反了，分屏功能不会生效！

---

## 💰 会话管理与 Token 策略

### 成本真相：混合模型省钱大法

团队领导可以用最强的 **Opus 4.6**，但团队成员**不必**都用这个最贵的！

**💡💡【插一嘴：是不是人类公司很像！！！】**

**省钱公式：**

> 👨‍💼 团队领导：Opus 4.6（统筹全局，需要最强能力）
> 
> 👷 团队成员：Sonnet（完成子任务，性价比更高）

很多时候 Sonnet 足够完成子任务，**成本直接砍半**！

![Pasted image 20260219001641.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 容易被忽略的坑：上下文隔离

当你从 Default 模式切换到 Agent Teams 时，团队成员**不会自动继承**你之前的对话历史！

**解决方案：**

如果你在 Default 模式已经聊了 20 分钟做背景调研，启动 Agent Teams 前先把这些背景整理成 **MD 文件**。

然后告诉团队领导：_“先读这个文件，了解背景，再执行具体任务。”_

### 竞态保护机制

多个代理抢同一个任务怎么办？Anthropic 已经处理了：

![Pasted image 20260219002001.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 只要某个代理比你快一点点抢到任务，它就会被**立即锁定**，其他代理拿不了。
> 
> 不会重复消耗 token！
> 
>   

---

## 🎮 实战演示与团队控制

### 动态关闭代理

四个代理在工作，发现其中一个已经完成了核心任务，想省 token？

直接跟团队领导说：_“请关闭【代理名称】”_

大多数情况下代理会优雅关闭。但如果它认为自己正在执行**关键任务**，可以拒绝并给出解释。

### 优雅关闭 vs 待机模式

**研究类任务**：完成后自动关闭，清理所有会话。

**开发类任务**：团队领导会保持团队**待机状态**。

**为什么？**

代理保留了任务上下文和所有变更历史。当你测试后发现还有 bug，可以直接说：

> _“让 QA 代理重新检查这部分”_
> 
> _“让后端代理修复这个 bug”_

代理能**立即回到工作状态**，无需重新理解整个项目！

### 持久化记忆策略

创建共享 **memory.md **[http://memory.md]文件，让所有代理记录：

- 遇到的问题
    
- 尝试的调试方法
    
- 已解决的 bug
    

下次启动新团队时，新代理可以读取这个文件，**继承之前的经验**。

### 真实成本参考

作者演示的研究任务：

- 4 个代理运行约 4 分钟
    
- **总成本：$1.15**
    

💡 **养成习惯：** 每次会话后查看 Cost 标签页，了解真实花费，才能更聪明地选择提示词和模型。

![Pasted image 20260219002842.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 🛠️ 将流程转化为 Skills

### Skill 的本质

把可重复的工作流程**固化**下来。

### 最佳创建方式（反直觉）

❌ 凭空写 Skill

✅ **先实际执行一次完整流程**，然后对 Claude 说：_“把我们刚才做的转化成 Skill”_

### ![图片](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 可以设置变量

比如研究 Skill，可以设置：

- `{topic}` - 研究主题
    
- `{model}` - 使用模型
    

下次调用时直接输入：

- 1
    

```
/research 为什么比特币在跌
```

### Skill 可以迭代优化

运行后发现有改进空间？直接说：

> _“请更新 Skill，将【某步骤】改成【新方式】”_

Claude 会自动修改 Skill 定义，**越用越顺手**。

---

## 🎬 视频金句摘录

> _“Default 模式下，模型会有‘tunnel vision’——隧道视野，只看那一个区域。”_

> _“团队的优势在于，你可以部署多个代理，告诉它们：你从左边看，从右边看，从上往下看。”_

> _“Absolute maximum capability 就像把油门踩到底，然后松开方向盘。”_

---

## 💡 结语

Agent Teams 不是简单的“多开几个 Claude”，而是一种**全新的工作范式**：

- 🔄 **独立会话**：突破 token 限制
    
- 👥 **角色分工**：避免单一视角局限
    
- 🤝 **实时协作**：提升问题解决效率
    

配合 TMUX 的可视化管理、混合模型的成本控制、以及 Skills 的流程固化——这可能是 **AI 辅助开发领域近期最重要的进化**。

正如作者所说：

> _"I hope you can now go away and use agent teams even better."_
> 
> （我希望你现在能去更好地使用Agent Team 了。）

---

## 📌 延伸阅读

如果你想深入学习，建议按这个顺序：

1️⃣ **先看完原视频**（22 分钟，链接在开头）

2️⃣ **跟着视频动手配置**（TMUX + 分屏）

3️⃣ **从一个简单的研究团队开始试水**

4️⃣ **逐步尝试开发类任务的团队协作**

---

## 🤔 互动话题

**你会用 Agent Team 来做什么项目？**

A. 开发一个完整的 Web 应用   
B. 做深度市场调研   
C. 重构祖传代码   
D. 其他（评论区说说）

---

**📮 关于作者**

Bart Slodyczka，Joolca.com 联合创始人，专注于 AI 工具在实际工作流中的应用。他的教程以**实战性强、比喻生动**著称，适合想快速上手的开发者。

---

---

**最前沿实践的传送门**

**可以扫码加我个人微信，**

**也可以扫海报加入我们的学习社团。**

  
![4f1ccf7a7309a9079dcd30f62bed20b0.jpg](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)  
![7803c47fa0426bbba9e94cb7266773a5.jpg](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 原视频关键内容快照

##   

**正文内容**

**00:00** 各位大神好。这期视频我会带你成为 Claude Code 代理团队的高手。最近 Opus 4.6 版本刚出来，带了一个全新功能叫代理团队。我们先讲讲代理团队是什么，它跟子代理、跟默认模式有什么区别

![Pasted image 20260218234605.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**00:18** 然后确保你的设置是对的，Claude Code 是最新版本，能用到所有模型，配置也都正确，能进入代理团队模式。接着我会给你看一个叫 TeamUX 的东西，用它管理团队里的不同代理会更方便。再看看会话管理，因为启动代理团队、管理交互都有特定的方法，这里 TMUX 会派上用场。最后，怎么关闭团队，结束所有任务。视频结尾我会展示怎么用 Claude Code 的 skills，让你以后管理团队更轻松

![Pasted image 20260218235608.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

**00:57** 现在有了代理团队，Claude Code 其实有三种用法。最早的那种就是默认模式。打开新终端，启动 Claude Code，跟一个 Claude 模型对话，可以写代码、调试、搜网页。技术上讲，代理团队模式和子代理模式能做的事，默认模式都能做。最大的区别是会话怎么管理。默认模式只有一个会话，子代理模式也只有一个会话，但代理团队模式下，每个代理都有自己的会话

![Pasted image 20260218235742.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**01:35** 这点特别重要，因为用默认模式时，你得知道一个会话能消耗的 token 是有限的，超了模型就会开始幻觉，忘了之前聊过什么。所以人们才有那么多技巧，搞专门的 MD 文件、skill 文件、memory 文件，为了在长时间运行、token 越来越多的情况下保持上下文

**02:03** 【默认模式】下，如果你给一个很庞大的代码库，代理很难看清代码库的所有部分。Anthropic 说这些模型会倾向于只关注某个特定区域，形成"隧道视野"，只看那一个地方。这就告诉我们什么时候该用哪种模式

![Pasted image 20260219000344.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**02:22** 现在有了另外两种模式，默认模式其实更像是你的系统管理面板。你可以进这里选模型、看有哪些 skills、设置项目、想想要哪些子代理、团队怎么搭。它本质上就是个控制面板

**02:44** 现在看【子代理模式】。什么场景用呢？想象你有个安保公司，在一栋高楼里有个控制室，所有人都在里面。墙上有监控器，你在看每块屏幕显示什么。如果某个房间有入侵，你从终端派一个代理下去，说："嘿，代理，去三楼，第五扇门，进那个房间，调查屏幕上这个问题。"

![Pasted image 20260219000319.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**03:13** 代理就会离开，坐电梯下楼，走楼梯，左转，跟五个人说话，进那个房间，找出问题，回来，坐电梯，走楼梯，回到控制室，给你总结："好了，我搞定了。巴特刚才乱跑，我让他坐下了。"完成任务过程中的那些步骤，我们不会回到控制室再看。这里的价值在于，如果你有个代码库，只有密码加邮箱的登录方式，你可以启动一个子代理，让它去加上 Google 登录的功能。我们之前说过，这里仍然只有一个主会话。这样做的价值在于节省主会话的 token，因为模型的 token 容量是有限的

**04:02** 这就是为什么子代理不会给你反馈"他左转了、右转了、跟五个人说话了、他们说了什么"，而是直接给你最终结果："我去了这个地方，完成了任务，搞定了"，或者"我去了那里，但没能完成，现在我们有新问题了。"它把总结返回到主上下文，保留整个会话的上下文。这就是子代理不一样的地方

**04:25** 现在说【代理团队】模式。想象你真的有一座高塔，大概 10 层，每层 10 个房间。代理团队模式就像你是安保公司，进入这座塔，终端给你一个任务：进这栋楼，做全面安保。今晚有活动，要确保每层楼、所有出入口都安全。有人进来要扫描，确保一切正常，要完整执行安保行动

![Pasted image 20260219000532.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**04:55** 任何安保团队里都有团队领导，他理解任务，然后分配工作。团队领导制定计划，也就是实际会话的计划，然后给每个代理提示。提示就像他给的指令。这个人可能要去左边负责前三层，那个人要去右边负责接下来三层。每个人都有自己分配的任务。有趣的是，有了这样的安保团队，你要能拿起对讲机，作为团队领导说："嘿伙计们，大家都到位了吗？很好，我们可以开始了。"当你在活动现场时，你可能会说："嘿，我在六楼，有人在搞事，他正往下走。所以 A 队友，做好准备，马上有人要进你那片区域了。"

![Pasted image 20260219000614.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**05:39** 这种沟通能让你更有效率地完成整栋楼的安保工作，因为你可以沟通，说这片区域有具体问题。请大家注意，做好准备，或者来帮我处理。刚才我说过，默认模式下你只有一个代理。代理或者说 LLM 普遍有个问题：单个会话里，它们通常会倾向于某个特定领域。一旦进去了，就很难再出来

**06:08** 这就是为什么你会发现，在用 ChatGPT 或 Claude 时，会有那种"好好先生综合征"：你说什么想法，它基本就是重复一遍，你很难跳出最初的想法框架，产生新想法

![Pasted image 20260219000716.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**06:21** 团队的优势在于，你仍然能得到同样的东西。每个代理通常还是会倾向于某个特定领域，但既然你可以为一个问题、一个想调查的代码库、一个想加的功能，同时启动多个不同的代理，那你就可以部署这些代理，告诉它们："你从左边看，你从右边看，你上楼从上往下看。"

![Pasted image 20260219000739.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**06:48** 最棒的是，你其实不用管理所有这些不同视角和上下文，因为团队领导会理解你的问题，然后启动，给每个子代理适当的上下文，这样一开始你就能收到一份 360 度的报告。现在我们对 Claude Code 的三种模式有了比较清楚的概念，开始理解每种模式的优缺点。现在进入设置环节，确保环境准备好用所有新功能

![Pasted image 20260219000820.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**07:20** 首先要确保系统上装了最新版 Claude。打开终端，输入 claude update，按回车。Claude 会检查更新，要么帮你更新，要么确认你已经在最新版本。关于 T-Max 和配置，我问了 ChatGPT 怎么设置。T-Max 就是让你在终端里创建独立窗口，这样你可以分别查看每个独立代理

![Pasted image 20260219001205.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**07:49** 想象你在面试，五个人在同一个房间里同时说话。你想跟他们每个人聊，根本不可能。太吵了，谈话太多了。更好的办法是给每个人一个单独的房间，这样你可以进去，平静地问："你在做什么？这是更新后的指令。"所以 T-Mox 就像给每个代理设了一个房间。任何阶段你都可以截屏，发给 ChatGPT 或 Claude，让它帮你提供具体的设置指导

**08:13** 我用的是 Mac。顺便说，Tmux 在 VS Code 或 Cursor 里用不了，必须在核心终端里。所以我把命令贴到这里。我已经装了 T-Max，对我来说过程很快。但通常在你机器上安装可能只要一两分钟

![Pasted image 20260219000907.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Pasted image 20260219000953.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**08:30** 装了 T-Max 后，其实有两种方式管理代理。第一种是"进程内"模式，你只有一个终端，所有代理都在那个终端里说话，像在一个房间里，很吵。第二种方式是分屏，分屏就是你要用 T-Mux 的原因——有那些独立的房间。所以我们只需要在配置文件里加那个设置，把 tm split panes 设成 true，在同一个文件里我们还要把 claude code experimental agents 设成 1，这是启用代理团队需要的另一个配置

![Pasted image 20260219001024.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Pasted image 20260219001245.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**09:06** 现在我们更新了 settings.json，启用了代理团队，也给每个团队分配了独立房间。这里快速说明一下，这其实是你的全局配置。我决定这么做是因为我想在所有跟 Claude 的会话里都能随时用代理团队。这样不用每次关终端、开新终端、再改配置，我直接对所有会话做了全局设置

![Pasted image 20260219001304.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**09:31** 现在，在启动 Claude Code 之前，我们要先启动一个 T-max 会话。我复制这条命令。再次提醒，别直接输 claude 命令启动新会话。我们先要启动新的 T-mark 会话。把命令贴到这里，按回车。现在我们已经准备好为代理创建所有不同的房间了。现在可以回来启动 Claude 了。我会用 dangerously skip permissions 启动我的。接受这个安全警告。现在我们登录进 Claude 了

![Pasted image 20260219001356.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Pasted image 20260219001443.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**09:58** 到这个阶段，我们已经做了概览，也完成了设置。现在看看怎么管理会话。首先要做的是进入模型，确保我们在用正确的模型。我们有 OP 4.6 模型。我很确定第一个是 20 万 token 上下文的模型。然后第二个是 100 万 token 上下文的模型

![Pasted image 20260219001520.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**10:16** 100 万 token 上下文模型的情况是，前 20 万个 token，你技术上用的是原来的模型，按常规费率收费；但超过 20 万个 token 的部分，你就得按高级定价了，每百万输入输出 token 分别是 10 美元和 37.5 美元

![Pasted image 20260219001535.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**10:31** 另外 Opus 还有个 effort 切换，左右点可以从 low effort 调到 medium 再到 high。然后这里有所有 effort 级别的解释。low 是最省 token 的，但能力会有所下降，就没那么聪明、没那么强、没那么好。medium 是平衡的方法，token 节省适中。high 基本是最适合复杂推理、困难编程问题的

![Pasted image 20260219001641.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**10:58** 要绝对最大能力，只有 Opus 4.6 模型有。这就像把油门踩到底，然后松开方向盘，看看会发生什么。我的建议是，先从常规 Opus 模型开始，一路调到 low effort。然后当你遇到障碍和问题，或者搞清楚了部署代理团队时哪种模型更好用，你可以调高档位，进入下一个 opus 模式，从 low 开始，然后 medium，然后 high

![Pasted image 20260219001725.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**11:32** Anthropic 明确告诉我们，必须告诉 Claude 创建一个代理团队。它给我们的所有例子里，都说"create an agent team"。有时说"create three different team members that focus on A, B, and C"，有时只说"create the agent team"，然后你自己决定怎么部署这些代理

![Pasted image 20260219001741.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Pasted image 20260219001758.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**11:52** 简单说说这些代理怎么协作，还有内存、任务分配的事。当你在这里输命令，说"嘿，给我创建一个代理团队"，你会得到一个团队领导，他接收你的请求，然后确定："好，这里要完成的工作是什么？我们需要完成哪些不同任务？每个代理需要哪些不同的提示？"

![Pasted image 20260219001817.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Pasted image 20260219001833.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**12:19** 但严格来说，甚至都不算严格意义上的，实际情况是这些代理访问不了完整的对话记录。所以如果你在这里进行默认对话，聊了 10 分钟、20 分钟、30 分钟，做了很多网页搜索，了解某个代码库。当你进入代理团队模式时，你其实想部署，把你的 MD 文件设置好，然后让默认模式的代理为之前已经进行过的会话提供正确的上下文

**12:59** 这样当它把工作分配给团队领导或队友时，可以直接告诉他们、指导他们：读 MD 文件，理解上下文是什么，然后这是你的具体任务。这样你就可以去做你的任务，同时还有额外的上下文。注意，这些代理获取不了原始对话的所有上下文

![Pasted image 20260219001934.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**13:18** 接下来你可能不知道的是，当团队领导创建任务时，取决于团队实际怎么搭建，会有一系列任务要完成。有时像自由竞争，比如："嘿，这是你们的四五个任务，你们俩做这五个任务。"你可能会想到一个问题：如果我跟你同时完成任务，我们都去抢下一个任务，怎么知道我们不会浪费 token 在同一个任务上，如果它已经被处理了？Anthropic 其实已经处理了这个问题

![Pasted image 20260219002001.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**13:38** 他们有个竞态条件检查机制，基本上只要我比你快一点点抢到这个任务，它就已经被锁定了，你拿不了。所以我们不会在同一任务上重复消耗 token

![Pasted image 20260219002040.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**13:57** 最后一点我想提，这其实是省 token 的策略：当你刚开始搭建团队，给团队领导提示创建一个四代理团队来重构这些模块时，你还可以定义想为这些团队成员用哪个模型。这其实挺好的，因为不用一直用最贵的 Opus 4.6，有时如果某个特定任务不需要最好的模型，你可以说用个更低的模型，对你来说更便宜，但你仍然能得到需要的结果。所以你不一定非要用 opus 4.6

![Pasted image 20260219002118.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**14:25** 现在在我们的例子里，我们不会写代码。我其实是想部署一个研究团队，了解某个特定话题，给我一些建议。我刚用我们聊过的一些策略创建了一个提示。我明确说创建一个代理团队。然后给出我想研究的问题，还定义了两个不同的代理，给团队领导一些自由去想一些对立的角度或者我们想调查的方向。最后我还定义了所有代理都用 Sonnet

![Pasted image 20260219002145.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Pasted image 20260219002448.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**15:03** 现在让我们启动它，我们还不会拆分窗口，因为我们启用了团队功能。首先要发生的事是，团队领导要确定：好，这个请求是关于什么的？我们需要做什么？定义要完成的任务，然后定义提示，然后去建立每个代理。只有到代理启动运行那一刻，我们才会进入不同窗口的分屏视图

![Pasted image 20260219002515.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Pasted image 20260219002538.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**15:22** 看，我们在分屏视图里启动第一个代理了。看起来第二个代理在第二个分屏视图里。我们启动了第四个代理。这是最后一个吗？1、2、3、4、5。我们可能其实在启动五个不同的代理。现在这个阶段，我们在右侧面板看到所有代理。我们可以点进其中一个代理，跟它对话。这里我们有 SAS AI adoption。如果我在键盘上输入："嘿，你好吗？"按回车，我就能专门从这个 SAS AI adoption 代理收到回复

![Pasted image 20260219002602.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Pasted image 20260219002635.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**16:00** 如果某个阶段你有四个代理在工作，你意识到其中一个不需要继续工作了，想省 token，你可以去找团队领导，用代理的名字专门问他："能不能关闭这个代理？"团队领导会发请求给代理。大多数时候队友可以批准，然后优雅地关闭。但如果他们在做关键任务，或者他们认为很关键，他们可以拒绝，给出解释

![Pasted image 20260219002656.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**16:34** 跟代理团队合作的最后阶段，其实是团队领导自动完成的。基本上团队领导会过一遍所有代理，确保所有任务完成，然后他们结束工作，然后会关闭团队，这样我们可以关闭所有共享资源。本质上就是关闭所有独立会话，然后把所有东西合并到一个会话里。这就是我们这里看到的情况。团队领导其实去关闭并清理了所有代理

![Pasted image 20260219002726.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Pasted image 20260219002755.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**17:05** 对于编码、创建应用、重构、调试这类应用，团队领导通常会留下整个团队或某些代理保持空闲状态。所以任务完成后不会直接关闭所有东西，而是会等你回来，做最终测试，然后说：好，你可以关闭团队了，或者请回到 QA 代理，让他们重新检查这部分，因为其实还是有问题。或者请回到后端代理，告诉他们修复这部分，因为还是有问题

**17:42** 这很重要，因为你保持了后端代理对他们所做工作的上下文，所有不同的变更，所有遇到的不同问题。所以他们应该能直接跳回项目，修复你告诉他们的任何东西。这很重要，因为你无论如何都不想丢失他们的特定上下文

**17:50** 另一种在这些会话之间保持记忆的策略是，比如如果我完全关闭这个团队，我们在写某种代码，你可以创建一个共享内存 MD 文件，让所有代理记录他们遇到的所有问题，所有 bug，所有他们尝试调试到那个阶段的东西，或者如果他们调试过，基本上就像一个持续更新的问题和修复列表。这样如果你在同一会话或不同会话中启动其他代理，你可以引用那个内存文件，在不同会话中长期保持

**18:18** 现在这个阶段，我只想看看我们刚才运行的会话的成本。看起来运行所有那些代理做了那个研究，4 分钟，花了 1.15 美元。我觉得这里可能真有什么事。这不完全对。通常你运行多个不同代理时，他们的 API 持续时间会累加。所以如果你五个代理运行 5 分钟，通常会显示 25 分钟持续时间

![Pasted image 20260219002842.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**18:40** 这里这些代理运行时间没那么短。比如某个工作了 5 分 33 秒。所以这里有些对不上。但一般来说，你应该在每次会话后，或每次代理启动关闭后，去你的成本标签页看看花了多少钱。这样下次你可以更聪明地选择提示或模型

**18:59** 到这个阶段，我们已经看了怎么启动团队，要明确说我们要一个代理团队。我们可以定义想要的不同模型。我们也看了不同的管理方式。所以不用让所有代理基本都在同一个房间里看，我们把他们分到独立房间。我们能看到他们在做什么。我们也能直接跟他们沟通。最后，看了这些关闭原则，关于清理某些代理如果我们不想让他们继续工作，但也要优雅地关闭团队，清理所有资源

![Pasted image 20260219002917.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**19:34** 有趣的是，我想讲的最后一点是 skills，怎么用 skills 来改进你管理团队的方式。skill 只是完成可重复流程的一种方式。就我自己跟代理的工作流程而言，我发现我让他们在不同话题上完成完全一样的东西。比如我有一套非常特定的做研究的方式。与其我每次都要提示整个研究流程，我可以把它变成一个 skill

![Pasted image 20260219002934.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**19:52** 我发现创建 skill 最好的方式不是从零开始写，上传，然后盲目地继续。而是先用 Claude Code 把 skill 作为流程完成一遍，然后让 Claude Code 为你创建那个 skill。在这个例子里，我们有个很基础的流程。我 literally 只说："创建一个研究团队。"我甚至没看结果，但通常你会来回说："我会研究这部分，或者你能把输出转成 PDF 吗，或者你能发邮件给我吗？"

**20:18** 一旦你跑完整个流程，你可以创建一个像这样的提示："把我们刚才做的变成一个 skill。"你还可以定义你想在那个 skill 里有不同的变量。比如对于我们的研究 skill，我们想有不同的话题，也许根据我们在做的研究用不同的模型。然后你可以直接走，按回车。现在 Claude 会拿这个特定流程，然后把那个 skill 存到我们的仓库里

  

![图片](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

**20:44** 另一个技巧是，每次你实际运行 skill 时，如果流程有你想做的更新，你可以回到 Claude 重新提示说："嘿，流程的新调整，我们怎么用更少的代理、更多的代理，或者不发邮件了，现在用 Slack，你能回去更新 skill 吗？"它可以一直为你保持最新

![Pasted image 20260219003114.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**21:01** 现在看起来 Claude 为我们创建了这个 skill，加到目录里了，现在我们可以输入斜杠，敲 research 来使用那个 skill。我们用参数表示话题，然后用 model 表示代理模型。然后我们得到一个很简单的解释，怎么用那个 skill。所以我们可以直接用斜杠 research "为什么比特币在跌"来用 Sonnet 代理运行，或者覆盖模型，你可以说"为什么比特币在跌用 haiku"

![Pasted image 20260219003141.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Pasted image 20260219003204.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**21:27** 现在为了使用那个 skill，我们不能在同一个会话里做。这就是为什么我们在这里看不到它出现。所以我们重新开一个 Claude 会话。按回车斜杠 research。这就是那个 skill。我们来测试一下。所以"为什么比特币在跌？"按回车。因为我其实没在 T-Max 里启动这个，我们不会看到所有代理的分屏面板，但我们确实在用那个 skill。启动一个多方研究团队调查为什么比特币在跌。就像之前一样，我们有证据收集者，有看涨案例、看跌案例，现在有两个对立的不同代理我们可以用

![Pasted image 20260219003218.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Pasted image 20260219003238.png](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**21:54** 好了各位，非常感谢观看。希望你们现在可以更好地使用代理团队。下期见。

---

**最前沿实践的传送门**

**可以扫码加我个人微信，**

**也可以扫海报加入我们的学习社团。**

  
![4f1ccf7a7309a9079dcd30f62bed20b0.jpg](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)  
![7803c47fa0426bbba9e94cb7266773a5.jpg](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate\(-249.000000,%20-126.000000\)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)