# 场刊 / 周边阅读方式修订

日期：2026-09-09。仅本地原型；真实 Loki OS 仓库的已有修改未触碰，未提交、部署、发布。

## 参考与转译

- Pentagram，Wien Modern：https://www.pentagram.com/work/wien-modern 。取其模块化标题承担画面构成的原则，不复制定制字形或图片。
- TaB Studio，Sensorium：https://www.tabstudio.eu/work/sensorium-beyond-the-sound 。取其文字尺度、节奏与空间关系，不复制视觉资产。
- 中文标题实际加载已有 Smiley Sans / 得意黑，正文保留 Noto Sans SC；字体文件未修改，OFL 许可证位于 ../typography-study/fonts/SmileySans-OFL.txt。没有宣称绝对零版权风险。

## 实际改变

- 淡黄色头像底换为蓝色框，保留公众号翻面、放大和保存。
- Skill 默认展示方法封套，GitHub 入口直接可见，制作信息在同页抽出；封套明确不是生成成果。
- 视觉为海报背页、写作为竖排稿页、研究为横向注解册、构建为通行证、个人为唱片。每条使用与方法对应的短字标与流程出口，未添加虚假生成结果。
- 作品介绍先用基于原文的问题引入，更多制作记录与公开边界在背面展开；原核验状态未改。
- 页角茶签可注茶/倒空；壁球彩蛋可回击/复位（明确是小游戏，非个人成绩）；05超女、浪姐与偏爱唱片可以切换名字并转动。观众手环展开为演唱会/Livehouse小角落。不含未授权音乐，不编造观演记录。

## 素材逐图复核

| 现有素材 | 处理 |
| --- | --- |
| exhibition-reading-desk-v1.webp | 泛黄书桌概念图，不是每日洞见成果。目录和详情撤下展示，替换为明确标注的阅读方法文字示意；保留原文件。 |
| exhibition-hub-ui-collage.webp | 实际是城市编辑台单张设计稿。撤销“多套真实界面”说明，改为设计稿、非真机截图。 |
| cola-inject-shot-1.png | 画面包含 Cola 及换肤控件，与界面系统相关；保留，不扩展到已验证所有主题。 |
| inkpanda-editor.png | 小说编辑器截图，与 InkPanda 对应；保留。 |
| ebook-app-home.png | 转换器首页，与电子书工具对应；保留。 |
| health-today-desktop-redacted.png | 已脱敏健康应用画面；保留，不恢复隐去内容。 |
| perspective-liulian-evidence-sheet-01.png | 节目帧采样，与人物研究证据对应；保留为证据，不作为普通歌手装饰图。 |
| lian-draw-result.jpg | 历史歌词卡片结果，与上上签对应；保留，交互仍待复核。 |
| skills-social-card-pair.png | 横版与方形样张，与社交卡片相关；未用于其他方法。 |
| loki.jpg / loki-wechat-official.jpg | IP 与公众号入口，未冒充个人微信。 |

仍有限制：没有真实成果的 Skill 展示方法封套和既有规则，不代表已经补齐成果图库。公开源码缺口没有用猜测地址填充。

验证：qa-merch.cjs 验证字体、封套、页角交互；qa.cjs 在 1440×900 与 390×844 检查40路由，并逐一检查26个Skill展开与收回、图片加载及横向溢出。截图在 /tmp/merch-*.png，为临时验收产物。
