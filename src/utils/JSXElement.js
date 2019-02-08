import React from 'react';

export class JSXElement {
    constructor(tag) {
        this.tag = tag;
        this.classes = [];
        this.ref = null;
    }

    addClassesFromArray(classesArray) {
        this.classes = classesArray.join(' ');
        return this;
    }

    setRef(ref) {
        this.ref = ref;
        return this;
    }

    getElement() {
        const Tag = this.tag;
        return (<Tag ref={this.ref} className={this.classes}></Tag>)
    }
}