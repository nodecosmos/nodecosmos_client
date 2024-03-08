import { UUID } from '../../../../types';
import { WidgetType } from '@uiw/react-codemirror';

export const COMMENT_THREAD_WIDGET_CLASS = 'cm-thread-widget';

export class CommentWidget extends WidgetType {
    widgetId: string;

    constructor(widgetId: string) {
        super();

        this.widgetId = widgetId;
    }

    toDOM() {
        const div = document.createElement('div');
        div.id = this.widgetId;
        div.className = 'cm-comment';

        div.addEventListener('mousedown', (e) => e.stopPropagation());

        return div;
    }
}

export class CommentThreadWidget extends WidgetType {
    threadId: UUID;

    constructor(threadId: string) {
        super();

        this.threadId = threadId;
    }

    toDOM() {
        const div = document.createElement('div');
        div.className = COMMENT_THREAD_WIDGET_CLASS + ' cm-comment';

        // Here we add threadId that is used by observer to create CommentThread component
        div.dataset.threadId = this.threadId;

        div.addEventListener('mousedown', (e) => e.stopPropagation());

        return div;
    }
}
