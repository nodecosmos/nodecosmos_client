import { StateEffect } from '@codemirror/state';
import { Decoration } from '@codemirror/view';

/**
 * StateEffect: Represents an atomic change or an event that can modify the state.
 * Effects are used to describe changes that should happen to the state but are defined
 * in a way that they don't immediately execute those changes.
 * Instead, they are dispatched with a transaction, and CM6 takes care of applying them to the state.
 * This allows for a very flexible and powerful way to handle state changes, as multiple effects
 * can be batched together in a single transaction, and CM6 ensures they are applied in a consistent manner.
 * Effects can be used to add or remove decorations, update a field, or trigger other state changes.
 */
export const setHoveredLine = StateEffect.define<number | null>();
export const setSelectedLine = StateEffect.define<number | null>();
export const setInsertCommentWidget = StateEffect.define<{deco: Decoration, from: number}>();
export const removeInsertCommentWidget = StateEffect.define<{deco: Decoration}>();
export const setThreadWidget = StateEffect.define<{deco: Decoration, from: number}>();
export const removeThreadWidget = StateEffect.define<{deco: Decoration}>();
