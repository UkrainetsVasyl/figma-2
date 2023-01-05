class Shape {
  private numberOfShapes = 5;
  private nodes: SceneNode[] = [];

  create() {
    for (let i = 0; i < this.numberOfShapes; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      this.nodes.push(rect);
    };

    figma.currentPage.selection = this.nodes;
    figma.viewport.scrollAndZoomIntoView(this.nodes);
  }

  star() {
    const rect = figma.createStar();
    rect.x = 150;
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    figma.currentPage.appendChild(rect);
    this.nodes.push(rect);
  }
}

export default Shape;