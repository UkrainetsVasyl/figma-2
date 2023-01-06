class Text {
    async uppercase() {
        const node: any = figma.currentPage.selection[0];

        await figma.loadFontAsync(node.fontName)

        if (figma.currentPage.selection.length !== 1) {
            return "Select a single node."
        }

        if (node.type === 'TEXT') {
            node.characters = node.characters.toUpperCase();
        }
    }

    async lowercase() {
        const node: any = figma.currentPage.selection[0];

        await figma.loadFontAsync(node.fontName)

        if (figma.currentPage.selection.length !== 1) {
            return "Select a single node."
        }

        if (node.type === 'TEXT') {
            node.characters = node.characters.toLowerCase();
        }
    }
}

export default Text;