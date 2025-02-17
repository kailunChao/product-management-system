import * as Icons from '@ant-design/icons-vue';
import { createVNode, FunctionalComponent } from 'vue';

type IconType = keyof typeof Icons;

interface AIconProps {
  type: IconType;
}

const AIcon: FunctionalComponent<AIconProps> = (props: AIconProps) => {
  const { type } = props;

  const IconComponent = Icons[type] as FunctionalComponent;

  return createVNode(IconComponent);
};

export { AIcon };