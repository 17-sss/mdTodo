class MySelector {
    $(classSelector, root = document) {
        if (!root.childNodes) return;
        if (root.className === classSelector) return root;

        let tmp;
        root.childNodes.forEach((node) => {
            if(this.$(classSelector, node))  
                tmp = this.$(classSelector, node);
        });

        return tmp;
    }
}

export default MySelector;
