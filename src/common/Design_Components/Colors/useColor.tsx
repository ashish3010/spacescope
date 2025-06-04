import { Colors } from './Color.types'

const useColor = (color: Colors) => {
  switch (color) {
    case Colors.Primary:
      return "#9169C1";
    case Colors.Primary_80:
      return "#462D86";
    case Colors.Primary_60:
      return "#B793D2";
    case Colors.Primary_40:
      return "#DFC8E4";
    case Colors.Primary_20:
      return "#F2E7F5";
    case Colors.Success:
      return "#25AB21";
    case Colors.Error:
      return "#F50031";
    case Colors.Warning:
      return "#F06D0F";
    case Colors.White:
      return "#FFFFFF";
    case Colors.Black:
      return "#000000";
    case Colors.Grey_80:
      return "rgba(0, 0, 0, 0.65)";
    case Colors.Grey_60:
      return "rgba(0, 0, 0, 0.55)";
    case Colors.Grey_40:
      return "rgba(0, 0, 0, 0.45)";
    case Colors.Grey_20:
      return "#F5F5F5";
    case Colors.Transparent:
      return "transparent";
    default:
      return "transparent"
  }
}

export default useColor