# CSS选择器

1.元素选择器

```css
p {
    color: black;
}
```
2.后代选择器：由两个选择器之间的空格表示

```css
blockquote p {
    padding-left: 2em;
}
```
3.类选择器

```html
<p class="date-posted">2009/3/24</p>
```
```css
.date-posted {
    color: #ccc;
}
```
4.ID选择器

```html
<p id="intro">Happy Birthday Andy</p>
```
```css
#intro {
    font-weight: bold;
}
```
