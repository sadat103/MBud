import * as React from "react";
import { Image } from "react-native";
import { TEXT_PRIMARY } from "../themes/constants";

export const STATS = ["Today", "Week", "All"];
export const GOOGLE = "google";
export const FB = "facebook";
export const NORMAL = "normal";
export const USER_INFO = "userInfo";
export const GOOGLE_FB_SESSION = "google fb session";
export const DAYS = ["S", "S", "M", "T", "W", "T", "F"];

export const MENUS = [
  {
    label: "Features",
    content: [
      {
        name: "Upgrade To Pro",
        icon: (
          <Image
            source={require("../../assets/crown2.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              //tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
      {
        name: "Theme",
        icon: (
          <Image
            source={require("../../assets/theme.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
    ],
  },
  {
    label: "About",
    content: [
      {
        name: "Share",
        icon: (
          <Image
            source={require("../../assets/share1.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
      {
        name: "Rate Us",
        icon: (
          <Image
            source={require("../../assets/rateus.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
      {
        name: "Guidelines",
        icon: (
          <Image
            source={require("../../assets/guideline.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
    ],
  },
  {
    label: "Help",
    content: [
      {
        name: "Contact Us",
        icon: (
          <Image
            source={require("../../assets/contactus.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
      {
        name: "FAQ",
        icon: (
          <Image
            source={require("../../assets/FAQ.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
      {
        name: "Request A Feature",
        icon: (
          <Image
            source={require("../../assets/requestafeature.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
    ],
  },
  {
    label: "Legal",
    content: [
      {
        name: "Terms of Service",
        icon: (
          <Image
            source={require("../../assets/termsofservice.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
      {
        name: "Privacy Policy",
        icon: (
          <Image
            source={require("../../assets/privacy.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
      {
        name: "Open-Source Packages",
        icon: (
          <Image
            source={require("../../assets/open-sourcepackages.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
    ],
  },
  {
    label: "Account",
    content: [
      {
        name: "Clear History",
        icon: (
          <Image
            source={require("../../assets/clearhistory.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
      {
        name: "Delete Account",
        icon: (
          <Image
            source={require("../../assets/trash-can.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
      {
        name: "Sign Out",
        icon: (
          <Image
            source={require("../../assets/signout.png")}
            style={{
              width: 19,
              height: 19,
              marginRight: 15,
              tintColor: TEXT_PRIMARY,
            }}
          />
        ),
      },
    ],
  },
];
