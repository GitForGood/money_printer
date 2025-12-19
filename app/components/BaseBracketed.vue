<template>
  <span class="bracketed-wrapper">
    <span class="bracket">[</span>
    <span class="content"><slot></slot></span>
    <span class="bracket">]</span>
  </span>
</template>

<style>
/* Global Button/Link Styles */
.bracketed-base {
  color: var(--text-color);
  font-size: 16px;
  font-family: 'Courier New', Courier, monospace;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  transition: padding 0.1s ease-in-out, color 0.1s, box-shadow 0.1s, background-color 0.1s;
}

.bracketed-base:focus {
  outline: none;
}

/* Internal Wrapper Gap logic */
.bracketed-base .bracketed-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0px;
  transition: gap 0.1s ease-in-out;
}

/* Hover/Focus States */
.bracketed-base:hover, 
.bracketed-base:focus-visible {
  padding: 4px 4px;
}

.bracketed-base:hover .bracketed-wrapper,
.bracketed-base:focus-visible .bracketed-wrapper {
  gap: 8px;
}

.bracketed-base:active {
  padding: 4px 8px;
}

.bracketed-base:active .bracketed-wrapper {
  gap: 4px;
}

/* Disabled State */
.bracketed-base.disabled,
.bracketed-base[disabled] {
  cursor: not-allowed !important;
  opacity: 0.5 !important;
}

.bracketed-base.disabled .bracketed-wrapper,
.bracketed-base[disabled] .bracketed-wrapper {
  gap: 0px !important;
}

/* Emphasized Variant */
.emphasized-base {
  border: 1px solid var(--text-color);
  box-shadow: 0 0 2px var(--text-color);
  background: rgba(0,0,0,0.2);
}

.emphasized-base:hover, 
.emphasized-base:focus-visible {
  box-shadow: 0 0 8px var(--text-color), inset 0 0 4px rgba(226, 122, 25, 0.2);
  background: rgba(226, 122, 25, 0.1);
}

.emphasized-base:active {
  box-shadow: 0 0 4px var(--text-color);
}

.bracket {
  font-weight: bold;
}
</style>

