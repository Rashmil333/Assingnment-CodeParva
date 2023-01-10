import WindIcon from './static/wind 1.svg';
import VisiIcon from './static/visibility 1.svg';
import HumidityIcon from './static/humidity 1.svg';
import { SvgFB, SvgInstagram, SvgLinkedIn, SvgLocation, SvgMailIcon, SvgTwitter } from "./static/Svgs";
export {
    WindIcon, VisiIcon, HumidityIcon
}
export const Links = [
    {
        id: 0,
        title: 'Home'
    },
    {
        id: 1,
        title: 'Contact Us'
    }
];

export const SocialLinks = [
    {
        id: 0,
        element: <SvgLinkedIn />
    },
    {
        id: 1,
        element: <SvgTwitter />,
    },
    {
        id: 2,
        element: <SvgInstagram />,
    },
];

export const WELCOMEDATA = {
    title: 'Welcome to the Animal Shelter !',
    description: 'Glad that you care for the animals so much. We make sure that you’ll not repent your decision of adopting your favorite pet !!'
};

export const DATA = {
    title: 'We do take in pets if you can’t take care of them !',
    description: 'Lorem epsum fbsdifcbij fkjebfkjebfkejbfewkjbfwkejbfwkefefb wef wef efnwekjfbkewjfb wkje febf weubfwef wiuefb ewfu webfuwe bfewufb efb ebf uewbfiuwefbwefweiuf wueibf iuwbefiu efewiufbwiuefbi euwbiuebfe bfe fejsdefsjnekdf ksjdnf kjsdnfkjesdnf kjsekdfjeskfjc fksdjfcekejsdfjkes efjebsf beskdb efkjebf kjbejk fbwekjsf bkewb'
};

export const FooterData = {
    desc: 'One of the best animal shelter places in India. We’re recognized by the government. Please take a pledge to take care of these lovely pets !',
    copyRight: "Copyright ©2023. Animal Shelter",
};

export const ContactData = [
    {
        id: '0',
        icon: <SvgLocation />,
        desc: "llesfnee cnu efoin eoifn oewifnewo inf sdccsdcneno ie woiwemfwokm fwew ecen cloenwo we - 355233",
    },
    {
        id: '1',
        icon: <SvgMailIcon />,
        desc: "cisubdcusb@gmail.com"
    }
];

export const FooterLinks = [
    {
        id: 0,
        element: <SvgTwitter />
    },
    {
        id: 1,
        element: <SvgFB />,
    },
    {
        id: 2,
        element: <SvgLinkedIn />,
    },
]

export const TermsAndConditionsData = [
    {
        id: 0,
        title: 'Privacy Policy'
    }, {
        id: 1,
        title: 'Terms of Service'
    },
    {
        id: 2,
        title: 'Cookies Settings'
    }
];

export const BreedData = [
    { id: 0, option: 'Breed 1' },
    { id: 1, option: 'Breed 2' },
    { id: 2, option: 'Breed 3' },
    { id: 3, option: 'Breed 4' }
];

export const Petata = [
    { id: 0, option: 'Dog' },
    { id: 1, option: 'Cat' },
    { id: 2, option: 'Monkey' },
    { id: 3, option: 'Parrot' }
];

export const Fields = {
    PETNAME: 'petname',
    BREED: 'breed',
    FULLNAME: 'fullname',
    EMAIL: 'email',
    PHONE: 'phone',
};

export const TableHeaders = [
    { id: 0, title: 'Name' },
    { id: 1, title: 'Breed' },
    { id: 2, title: 'Age (months)' },
]

export const TableData = [
    { id: 0, petType: 'Lyka', breed: 'Dasch', age: '12' },
    { id: 1, petType: 'Lyka', breed: 'Golden Retriever', age: '12' },
    { id: 2, petType: 'Lyka', breed: 'Dasch', age: '12' },
]