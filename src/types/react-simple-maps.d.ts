declare module "react-simple-maps" {
  import type { ComponentType, ReactNode, SVGProps } from "react";

  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: object;
    style?: {
      default?: Record<string, unknown>;
      hover?: Record<string, unknown>;
      pressed?: Record<string, unknown>;
    };
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }

  export const ComposableMap: ComponentType<{
    width?: number;
    height?: number;
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    className?: string;
    children?: ReactNode;
  }>;

  export const Geographies: ComponentType<{
    geography: string | object;
    children: (props: { geographies: Array<{ rsmKey: string; properties: Record<string, string> }> }) => ReactNode;
  }>;

  export const Geography: ComponentType<GeographyProps>;

  export const Marker: ComponentType<{
    coordinates: [number, number];
    children?: ReactNode;
  }>;

  export const Sphere: ComponentType<SVGProps<SVGCircleElement>>;

  export function useMapContext(): {
    width: number;
    height: number;
    projection: (coords: [number, number]) => [number, number] | null;
    path: (geo: object) => string | null;
  };
}
