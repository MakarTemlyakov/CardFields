import { DataField } from '../App';
import { actions } from '../actions/constatns';

type Payload<T> = T;

export type Action = {
  type: string;
  payload: Payload<DataField>;
};

export const fieldsRedcuer = (fields: DataField[], action: Action) => {
  switch (action.type) {
    case actions.ADD: {
      return [
        ...fields,
        {
          id: action.payload.id,
          name: action.payload.name,
          value: action.payload.value,
        },
      ];
    }
    case actions.DELETE: {
      return [...fields].filter((field) => field.id !== action.payload.id);
    }
    default:
      return fields;
  }
};
