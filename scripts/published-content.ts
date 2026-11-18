import ts from 'typescript';
import type { Plugin } from 'vite';

const sources = ['/src/data/projects.ts', '/src/data/site.ts', '/src/data/deep.ts'];

export function publishedContent(): Plugin {
  return {
    name: 'published-content',
    enforce: 'pre',
    transform(code, id) {
      if (!sources.some(path => id.endsWith(path))) return;
      const file = ts.createSourceFile(id, code, ts.ScriptTarget.Latest, true);
      const result = ts.transform(file, [context => {
        const visit: ts.Visitor = node => {
          if (ts.isArrayLiteralExpression(node)) {
            const visible = node.elements.filter(entry => !ts.isObjectLiteralExpression(entry) ||
              !entry.properties.some(property => ts.isPropertyAssignment(property) &&
                (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
                property.name.text === 'verify' && property.initializer.kind === ts.SyntaxKind.TrueKeyword));
            if (visible.length !== node.elements.length) {
              node = context.factory.updateArrayLiteralExpression(node, visible);
            }
          }
          return ts.visitEachChild(node, visit, context);
        };
        return root => ts.visitNode(root, visit) as ts.SourceFile;
      }]);
      const published = ts.createPrinter().printFile(result.transformed[0]);
      result.dispose();
      return { code: published, map: null };
    },
  };
}
