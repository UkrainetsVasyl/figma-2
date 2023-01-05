import Shape from "./features/shape";
import Resize from "./features/resize";
import Page from "./features/page";
import Image from "./features/image";

if (figma.editorType === 'figma') {
  figma.showUI(__html__);

  figma.ui.onmessage = msg => {

    if (msg.type === 'shape') {
      new Shape().create();
    }

    if (msg.type === 'star') {
      new Shape().star();
    }

    if (msg.type === 'image-svg') {
      new Image().addSVG();
    }

    if (msg.type === 'resize-height-up') {
      new Resize().increaseHeight();
    }

    if (msg.type === 'resize-height-down') {
      new Resize().decreaseHeight();
    }

    if (msg.type === 'resize-width-down') {
      new Resize().decreaseWidht();
    }

    if (msg.type === 'resize-width-up') {
      new Resize().increaseWidth();
    }

    if (msg.type === 'resize-scale-up') {
      new Resize().increaseScale();
    }

    if (msg.type === 'resize-scale-down') {
      new Resize().decreaseScale();
    }

    if (msg.type === 'move-top') {
      new Resize().moveTop();
    }

    if (msg.type === 'move-down') {
      new Resize().moveDown();
    }

    if (msg.type === 'move-left') {
      new Resize().moveLeft();
    }

    if (msg.type === 'move-right') {
      new Resize().moveRight();
    }

    if (msg.type === 'rotate-right') {
      new Resize().rotateRight();
    }

    if (msg.type === 'rotate-left') {
      new Resize().rotateLeft();
    }

    if (msg.type === 'page-next') {
      new Page().toNext();
    }

    if (msg.type === 'page-prev') {
      new Page().toPrev();
    }
  }
};
