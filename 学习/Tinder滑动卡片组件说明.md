# 💝 Tinder 滑动卡片组件使用说明

## 📚 组件概述

这是一个类似 Tinder 的滑动卡片组件，提供流畅的触摸交互体验。用户可以通过滑动手势来选择喜欢或不喜欢的内容。

---

## ✨ 功能特点

### 🎯 三种滑动手势
- **👉 右滑（Swipe Right）**：表示喜欢 ❤️
- **👈 左滑（Swipe Left）**：表示不喜欢 ❌
- **👆 上滑（Swipe Up）**：表示超级喜欢 ⭐

### 🎨 视觉反馈
- 实时显示 LIKE / NOPE / SUPER LIKE 标签
- 卡片旋转和位移动画
- 平滑的过渡效果
- 堆叠卡片的缩放和偏移

### 📱 移动端优化
- 触摸事件优化
- 流畅的拖拽体验
- 速度检测（快速滑动）
- 阈值判断（滑动距离）
- 弹性回弹效果

### 💻 桌面端支持
- 底部操作按钮（可选）
- 鼠标交互支持
- 响应式设计

---

## 🚀 快速开始

### 基本使用

```tsx
import { TinderCard, TinderCardList } from "../islands/TinderCardList.tsx";

export default function MyPage() {
    return (
        <TinderCardList
            onSwipeLeft={(index) => console.log("Disliked card", index)}
            onSwipeRight={(index) => console.log("Liked card", index)}
            onSwipeUp={(index) => console.log("Super liked card", index)}
            onEmpty={() => console.log("All cards finished!")}
        >
            <TinderCard>
                <div>内容 1</div>
            </TinderCard>
            
            <TinderCard>
                <div>内容 2</div>
            </TinderCard>
            
            <TinderCard>
                <div>内容 3</div>
            </TinderCard>
        </TinderCardList>
    );
}
```

---

## 📖 API 文档

### TinderCardList Props

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `children
` | `ComponentChildren` | ✅ | 卡片内容（TinderCard 组件） |
| `onSwipeLeft` | `(index: number) => void` | ❌ | 左滑回调函数 |
| `onSwipeRight` | `(index: number) => void` | ❌ | 右滑回调函数 |
| `onSwipeUp` | `(index: number) => void` | ❌ | 上滑回调函数 |
| `onEmpty` | `() => void` | ❌ | 所有卡片完成后的回调 |

### TinderCard Props

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `children` | `ComponentChildren` | ✅ | 卡片内容（任意内容） |

---

## 💡 使用示例

### 示例 1：简单的食物选择

```tsx
<TinderCardList
    onSwipeRight={(index) => console.log("喜欢", index)}
    onSwipeLeft={(index) => console.log("不喜欢", index)}
>
    <TinderCard>
        <div class="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
            <div class="text-white text-center">
                <div class="text-8xl mb-4">🍕</div>
                <h2 class="text-4xl font-bold">披萨</h2>
            </div>
        </div>
    </TinderCard>
    
    <TinderCard>
        <div class="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
            <div class="text-white text-center">
                <div class="text-8xl mb-4">🍣</div>
                <h2 class="text-4xl font-bold">寿司</h2>
            </div>
        </div>
    </TinderCard>
</TinderCardList>
```

### 示例 2：单词卡片学习

```tsx
<TinderCardList
    onSwipeRight={(index) => {
        // 标记为"已掌握"
        markAsLearned(words[index]);
    }}
    onSwipeLeft={(index) => {
        // 标记为"需要复习"
        markForReview(words[index]);
    }}
    onSwipeUp={(index) => {
        // 标记为"完全掌握"
        markAsMastered(words[index]);
    }}
>
    {words.map((word) => (
        <TinderCard key={word.id}>
            <div class="w-full h-full p-8 flex flex-col justify-center bg-white">
                <h2 class="text-5xl font-bold text-center mb-4">
                    {word.japanese}
                </h2>
                <p class="text-2xl text-center text-gray-600">
                    {word.romaji}
                </p>
                <p class="text-xl text-center text-gray-500 mt-4">
                    {word.english}
                </p>
            </div>
        </TinderCard>
    ))}
</TinderCardList>
```

### 示例 3：图片展示

```tsx
<TinderCardList>
    {images.map((image) => (
        <TinderCard key={image.id}>
            <div class="w-full h-full">
                <img 
                    src={image.url} 
                    alt={image.title}
                    class="w-full h-full object-cover"
                />
                <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <h3 class="text-2xl font-bold">{image.title}</h3>
                    <p class="text-sm opacity-90">{image.description}</p>
                </div>
            </div>
        </TinderCard>
    ))}
</TinderCardList>
```

---

## 🎮 交互说明

### 触摸手势

1. **按住卡片** - 开始拖拽
2. **左右拖动** - 卡片跟随手指移动并旋转
3. **松开手指** - 根据滑动距离和速度判断：
   - 超过阈值 → 飞出屏幕
   - 未达阈值 → 回弹到原位

### 滑动判断标准

- **距离阈值**：100px
- **速度阈值**：0.5 px/ms
- **满足任一条件即可触发**

### 视觉指示器

| 滑动方向 | 显示位置 | 颜色 | 文字 |
|---------|---------|------|------|
| 右滑 | 左上角 | 绿色 | LIKE |
| 左滑 | 右上角 | 红色 | NOPE |
| 上滑 | 中央 | 蓝色 | SUPER LIKE |

---

## 🎨 自定义样式

### 卡片尺寸

卡片容器默认高度为 `500
