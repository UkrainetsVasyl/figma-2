class Page {
  private getPages() {
    const filter = (node: any) => node.name.toLowerCase().startsWith(''.toLowerCase());
    const pages = figma.root
      .findChildren(node => ''.length === 0 ? true : filter(node))
      .map(node => ({ name: `${node.name} (page)`, data: { name: node.name, id: node.id } }));
    return pages;
  }

  private choosePage(id: string) {
    const node = figma.getNodeById(id);
    if (node) {
      if (node.type === "PAGE") {
        figma.currentPage = node;
      } else {
        let currentParent: any = node.parent;
        while (currentParent?.type !== "PAGE") {
          currentParent = currentParent?.parent;
        }
        figma.currentPage = currentParent;
        figma.viewport.scrollAndZoomIntoView([node]);
        figma.currentPage.selection = [node as SceneNode];
      }
    }
  }

  toNext() {
    const pages = this.getPages();
    const currentIndex = pages.findIndex(({ data }) => figma.currentPage.id === data.id);
    const nextPageId = pages[currentIndex + 1]?.data?.id?.toString();
    if (nextPageId) this.choosePage(nextPageId);
  }

  toPrev() {
    const pages = this.getPages();
    const currentIndex = pages.findIndex(({ data }) => figma.currentPage.id === data.id);
    const prevPageId = pages[currentIndex - 1]?.data?.id?.toString();
    if (prevPageId) this.choosePage(prevPageId);
  }
}

export default Page;