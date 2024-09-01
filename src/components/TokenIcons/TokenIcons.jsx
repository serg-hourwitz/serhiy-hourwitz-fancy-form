import React from 'react'; 

import BlurIcon from '../../assets/tokens/BLUR.svg';
import BneoIcon from '../../assets/tokens/bNEO.svg';
import BusdIcon from '../../assets/tokens/BUSD.svg';
import UsdIcon from '../../assets/tokens/USD.svg';
import EthIcon from '../../assets/tokens/ETH.svg';
import GmxIcon from '../../assets/tokens/GMX.svg';
import LunaIcon from '../../assets/tokens/LUNA.svg';
import StrdIcon from '../../assets/tokens/STRD.svg';
import EvmosIcon from '../../assets/tokens/EVMOS.svg';
import IbcxIcon from '../../assets/tokens/IBCX.svg';
import IrisIcon from '../../assets/tokens/IRIS.svg';
import AmpLunaIcon from '../../assets/tokens/ampLUNA.svg';
import KujiIcon from '../../assets/tokens/KUJI.svg';
import UsdcIcon from '../../assets/tokens/USDC.svg';
import AtomIcon from '../../assets/tokens/ATOM.svg';
import OsmoIcon from '../../assets/tokens/OSMO.svg';
import LsiIcon from '../../assets/tokens/LSI.svg';
import OkbIcon from '../../assets/tokens/OKB.svg';
import OktIcon from '../../assets/tokens/OKT.svg';
import SwthIcon from '../../assets/tokens/SWTH.svg';
import UscIcon from '../../assets/tokens/USC.svg';
import WbtcIcon from '../../assets/tokens/WBTC.svg';
import YieldUSDIcon from '../../assets/tokens/YieldUSD.svg';
import ZilIcon from '../../assets/tokens/ZIL.svg';


const tokenIcons = {
  BLUR: BlurIcon,
  bNEO: BneoIcon,
  BUSD: BusdIcon,
  USD: UsdIcon,
  ETH: EthIcon,
  GMX: GmxIcon,
  LUNA: LunaIcon,
  STRD: StrdIcon,
  IBCX: IbcxIcon,
  EVMOS: EvmosIcon,
  IRIS: IrisIcon,
  ampLUNA: AmpLunaIcon,
  KUJI: KujiIcon,
  USDC: UsdcIcon,
  ATOM: AtomIcon,
  OSMO: OsmoIcon,
  LSI: LsiIcon,
  OKB: OkbIcon,
  OKT: OktIcon,
  SWTH: SwthIcon,
  USC: UscIcon,
  WBTC: WbtcIcon,
  YieldUSD: YieldUSDIcon,
  ZIL: ZilIcon,
};

const TokenIcons = ({ symbol, alt }) => {
  const Icon = tokenIcons[symbol];

  if (!Icon) {
    return null; // Return null if the icon does not exist
  }

  return (
    <img
      src={Icon}
      alt={alt || `${symbol} icon`}
      sx={{ width: 24, height: 24 }}
    />
  );
};

export default TokenIcons;
