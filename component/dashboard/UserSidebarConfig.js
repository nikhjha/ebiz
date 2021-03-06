import { Icon } from "@iconify/react";
import accountBox from "@iconify/icons-ic/account-box";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const userSidebarConfig = [
  {
    title: "ACCOUNT",
    path: "/user/account",
    icon: getIcon(accountBox),
  },
  {
    title: "QUOTES",
    path: "/user/quotes",
    icon: <RequestQuoteIcon sx={{ fontSize: 22 }} />,
  },
  {
    title: "OFFERS",
    path: "/user/offers",
    icon: <LocalOfferIcon sx={{ fontSize: 22 }} />,
  },
];

export default userSidebarConfig;
