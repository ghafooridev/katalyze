import { useEffect } from 'react';
import SmilesDrawer from 'smiles-drawer';

const MolecularImg = ({ imgStr }) => {
  const drawer = new SmilesDrawer.SvgDrawer({
    padding: 0,
  });
  useEffect(() => {
    SmilesDrawer.parse(imgStr, (tree) => {
      drawer.draw(tree, 'structure-svg', 'light');
    });
  }, []);
  return (
    <div className="w-full">
      <svg id="structure-svg" height={144} className="w-full"></svg>
    </div>
  );
};

export default MolecularImg;
