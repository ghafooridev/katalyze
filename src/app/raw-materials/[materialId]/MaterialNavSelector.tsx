import {
  Autocomplete, AutocompleteItem,
} from '@nextui-org/react';

import MaterialNavbar from '../_components/MaterialNavbar';

interface MaterialNavbarSelectorProps {
  links: any;
  placeholder?: string;
  materialSelector?: { id: string; name: string }[];
  selectedMaterial: string;
  onChangeSelector?: (key: React.Key | null) => void;
}
export const MaterialNavSelector: React.FC<MaterialNavbarSelectorProps> = ({
  links,
  materialSelector,
  selectedMaterial,
  onChangeSelector,
}) => (
  <MaterialNavbar links={links}>
    <div className='flex flex-col gap-5 px-4 pt-6'>
      {materialSelector?.length && (
        <Autocomplete
          name="material"
          variant="bordered"
          label="Select Raw Material"
          labelPlacement="outside"
          className="max-w-xs"
          defaultSelectedKey={selectedMaterial}
          onSelectionChange={onChangeSelector}
          isClearable={false}
          data-testid='material-nav-selector'
        >
          {materialSelector.map((material) => (
            <AutocompleteItem key={material.id} value={material.id}
              textValue={material.name}>
              <div className='flex justify-between gap-2'>
                <p className='truncate'> {material.name}</p>
                <span className='text-gray-600'>{material.id}</span>
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
      )}
    </div>
  </MaterialNavbar>);
