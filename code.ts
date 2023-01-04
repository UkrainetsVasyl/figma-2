// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).
const types = [
  "BOOLEAN_OPERATION",
  "COMPONENT",
  "COMPONENT_SET",
  "CONNECTOR",
  "DOCUMENT",
  "ELLIPSE",
  "FRAME",
  "GROUP",
  "INSTANCE",
  "LINE",
  "PAGE",
  "POLYGON",
  "RECTANGLE",
  "SHAPE_WITH_TEXT",
  "SLICE",
  "STAMP",
  "STAR",
  "STICKY",
  "TEXT",
  "VECTOR",
];

// The 'input' event listens for text change in the Quick Actions box after a plugin is 'Tabbed' into.
figma.parameters.on('input', ({ key, query, result }) => {
  switch (key) {
      case 'name':
          const filter = (node: any) => node.name.toLowerCase().startsWith(query.toLowerCase());

          // Always suggest all of the pages in the file 
          const pages = figma.root
            .findChildren(node => query.length === 0 ? true : filter(node))
            .map(node => ({ name: `${node.name} (page)`, data: { name: node.name, id: node.id } }));

          // Only show layers when the user types a query 
          const nodes = query.length > 0 ? figma.currentPage
              .findAll(node => filter(node)) : [];

          const formattedNodes = nodes.map((node) => {
              const name = `${node.name} [${node.id}]`;
              return ({ name, data: { name: node.name, id: node.id } });
          });
          const suggestions = [...pages, ...formattedNodes];
          result.setSuggestions(suggestions);
          break;
      default:
          return;
  }
});

// When the user presses Enter after inputting all parameters, the 'run' event is fired.
figma.on('run', ({ parameters }) => {
  startPluginWithParameters(parameters!);
});

// Start the plugin with parameters
function startPluginWithParameters(parameters: any) {
  const { name, id } = parameters['name'];
  const node = figma.getNodeById(id);
  if (node) {
      // Node found, so we need to go to that node
      if (node.type === "PAGE") {
          figma.currentPage = node;
      } else {
          // Figure out if the node is on the right page, 
          // otherwise, we need to switch to that page before zooming into the view
          let currentParent: any = node.parent;
          while (currentParent?.type !== "PAGE") {
              currentParent = currentParent?.parent;
          }
          figma.currentPage = currentParent;
          figma.viewport.scrollAndZoomIntoView([node]);
          figma.currentPage.selection = [node as SceneNode];
      }
  } else {
      // Could not find node
      figma.notify(`Could not find node with name=${name}`);
  }
  figma.closePlugin();
}
;
// Runs this code if the plugin is run in Figma
// if (figma.editorType === 'figma') {
//   // This plugin will open a window to prompt the user to enter a number, and
//   // it will then create that many rectangles on the screen.

//   // This shows the HTML page in "ui.html".
//   figma.showUI(__html__);

//   // Calls to "parent.postMessage" from within the HTML page will trigger this
//   // callback. The callback will be passed the "pluginMessage" property of the
//   // posted message.
//   figma.ui.onmessage = msg => {
//     // One way of distinguishing between different types of messages sent from
//     // your HTML page is to use an object with a "type" property like this.
//     if (msg.type === 'create-shapes') {
//       const nodes: SceneNode[] = [];
//       for (let i = 0; i < msg.count; i++) {
//         const rect = figma.createRectangle();
//         rect.x = i * 150;
//         rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
//         figma.currentPage.appendChild(rect);
//         nodes.push(rect);
//       }
//       figma.currentPage.selection = nodes;
//       figma.viewport.scrollAndZoomIntoView(nodes);
//     }

//     // Make sure to close the plugin when you're done. Otherwise the plugin will
//     // keep running, which shows the cancel button at the bottom of the screen.
//     if (msg.type === 'close') {
//       figma.closePlugin()
//     }
//   };

//   // If the plugins isn't run in Figma, run this code
// } else {
//   // This plugin will open a window to prompt the user to enter a number, and
//   // it will then create that many shapes and connectors on the screen.

//   // This shows the HTML page in "ui.html".
//   figma.showUI(__html__);

//   // Calls to "parent.postMessage" from within the HTML page will trigger this
//   // callback. The callback will be passed the "pluginMessage" property of the
//   // posted message.
//   figma.ui.onmessage = msg => {
//     // One way of distinguishing between different types of messages sent from
//     // your HTML page is to use an object with a "type" property like this.
//     if (msg.type === 'create-shapes') {
//       const numberOfShapes = msg.count;
//       const nodes: SceneNode[] = [];
//       for (let i = 0; i < numberOfShapes; i++) {
//         const shape = figma.createShapeWithText();
//         // You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
//         shape.shapeType = 'ROUNDED_RECTANGLE'
//         shape.x = i * (shape.width + 200);
//         shape.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
//         figma.currentPage.appendChild(shape);
//         nodes.push(shape);
//       };

//       for (let i = 0; i < (numberOfShapes - 1); i++) {
//         const connector = figma.createConnector();
//         connector.strokeWeight = 8

//         connector.connectorStart = {
//           endpointNodeId: nodes[i].id,
//           magnet: 'AUTO',
//         };

//         connector.connectorEnd = {
//           endpointNodeId: nodes[i + 1].id,
//           magnet: 'AUTO',
//         };
//       };

//       figma.currentPage.selection = nodes;
//       figma.viewport.scrollAndZoomIntoView(nodes);
//     }

//     // Make sure to close the plugin when you're done. Otherwise the plugin will
//     // keep running, which shows the cancel button at the bottom of the screen.
//     figma.closePlugin();
//   };
// };
