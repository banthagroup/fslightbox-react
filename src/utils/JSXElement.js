import React from 'react';

export class JSXElement {
    constructor(tag) {
        this.tag = tag;
    }

    addClassesFromArray(classesArray) {
        this.classes = classesArray.join(' ');
        return this;
    }

    getElement() {
        const Tag = this.tag;
        return (<Tag className={this.classes}></Tag>)
    }
}