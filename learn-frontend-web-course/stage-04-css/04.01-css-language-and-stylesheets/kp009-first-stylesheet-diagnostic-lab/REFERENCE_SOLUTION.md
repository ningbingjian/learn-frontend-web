# KP009 Reference Solution Notes

> 只有完成自己的 `DIAGNOSTIC_REPORT.md` 后再阅读。

## C01：错误 Stylesheet URL
Network 中 `missing-theme.css` 为 404。根因是资源层，不是 Specificity。修复 `<link>` 为 `./theme.css`。

## C02：Source Order
Internal 与 External selector Specificity 相同，External stylesheet 在后面进入 document order，因此后者获胜。应明确资源顺序，不要用 `!important`。

## C03：Importance
Author `!important` 压过 inline normal。修复是删除无必要 important，而不是给 inline 再加 important。

## C04：Specificity
`#specificity-zone .state-target` 比 `.state-target.active` Specificity 更高。修复应降低组件基础 selector，而不是继续升级状态 selector。

## C05：Inheritance
子元素已显式声明 color，所以不会继续从父级继承。删除 child declaration 或使用 `color: inherit`。

## C06：Invalid Declaration
`definitely-not-a-background` 对 `background` 无效；浏览器忽略它并保留前一个合法值。

## C07：Shorthand Reset
`background` shorthand 重设相关 background longhands，导致先前 `background-image` 消失。用 `background-color` + `background-image` 或一个完整 shorthand。

## C08：Layer Order
Broken 为 `@layer app, vendor;`，normal declarations 中 vendor 更晚优先。修复为 `@layer vendor, app;`，不要用更重 selector 对抗错误 Layer Order。

## C09：Scope Proximity 不是第一优先级
Broken outer scope 使用 `#scope-zone .scope-target`，Specificity 高于 inner `.scope-target`，所以 Scoping Proximity 没机会决定。让二者 Specificity 相同后，更近 inner scope 才在 Source Order 前获胜。
