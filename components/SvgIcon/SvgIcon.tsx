export interface SvgIconProps {
  src: string
  width: string
  height: string
}
const SvgIcon = ({ src, width, height }: SvgIconProps): JSX.Element => (
  <img src={`/img/svg/${src}`} alt={src} width={width} height={height} />
)

export default SvgIcon
