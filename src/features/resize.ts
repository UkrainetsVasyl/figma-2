class Resize {
  increaseScale() {
    for (const node of figma.currentPage.selection) {
      if ('rescale' in node) {
        node.rescale(2)
      }
    }
  }

  decreaseScale() {
    for (const node of figma.currentPage.selection) {
      if ('rescale' in node) {
        node.rescale(0.5)
      }
    }
  }

  increaseHeight() {
    for (const node of figma.currentPage.selection) {
      if ('resize' in node) {
        node.resize?.(
          node.width,
          node.height + 20
        )
      }
    }
  }

  decreaseHeight() {
    for (const node of figma.currentPage.selection) {
      if ('resize' in node) {
        node.resize?.(
          node.width,
          node.height - 20
        )
      }
    }
  }

  decreaseWidht() {
    for (const node of figma.currentPage.selection) {
      if ('resize' in node) {
        node.resize?.(
          node.width - 20,
          node.height
        )
      }
    }
  }

  increaseWidth() {
    for (const node of figma.currentPage.selection) {
      if ('resize' in node) {
        node.resize?.(
          node.width + 20,
          node.height
        )
      }
    }
  }

  moveTop() {
    for (const node of figma.currentPage.selection) {
      node.y -= 10;
    }
  }

  moveDown() {
    for (const node of figma.currentPage.selection) {
      node.y += 10;
    }
  }

  moveLeft() {
    for (const node of figma.currentPage.selection) {
      node.x -= 10;
    }
  }

  moveRight() {
    for (const node of figma.currentPage.selection) {
      node.x += 10;
    }
  }

  rotateRight() {
    for (const node of figma.currentPage.selection) {
      if ('rotation' in node) {
        node.rotation -= 10;
      }
    }
  }

  rotateLeft() {
    for (const node of figma.currentPage.selection) {
      if ('rotation' in node) {
        node.rotation += 10;
      }
    }
  }
}

export default Resize;