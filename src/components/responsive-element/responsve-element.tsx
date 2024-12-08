import { useResponsive } from 'src/hooks/use-responsive';

const ResponsivElement = ({ children, query, end }: any) => {
  const smdwn = useResponsive(query, end);
  return !smdwn && children;
};

export default ResponsivElement;
