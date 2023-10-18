import React from "react";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import "./About.css";

const AboutPage = () => {
  return (
    <div className="bg-gray-100">
      <header className="py-4 mx-8">
        <h1 className="text-4xl">About</h1>
      </header>
      <main id="about-page-main" className="container mx-auto px-8">
        <Paper variant="elevation" className="p-4 mb-4">
          <h2 className="text-2xl mb-2">Meet the Team</h2>

          <Avatar
            alt="Alex Stepanov"
            src="https://i.imgur.com/7BssNrB.jpg"
            sx={{ width: 136, height: 136 }}
            className="mr-2"
          />
          <div>
            <h2 className="text-xl">Alex Stepanov</h2>
            <h2 className="text-sm mb-2 text-gray-500">Full Stack Developer</h2>
          </div>
          <p className="text-justify">
            Alex is a Full Stack Developer with experience in agile product
            management. As a new parent residing in Calgary, Alberta, Alex
            empathizes with the challenges faced by parents in Alberta who are
            struggling to find childcare for their children. He is eager to
            provide the best experience by leveraging the latest technologies.
            If you have anything to discuss, feel free to contact him via{" "}
            <Link
              href="https://www.linkedin.com/in/aleksandr-stepanov/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              LinkedIn
            </Link>
            .
          </p>

          <div className="w-24 mx-auto flex justify-between">
            <Link
              href="https://stepanovcodes.com/"
              target="_blank"
              rel="noreferrer"
            >
              <LanguageIcon sx={{ fontSize: 24 }} />{" "}
            </Link>
            <Link
              href="https://www.linkedin.com/in/aleksandr-stepanov/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon sx={{ fontSize: 24 }} />
            </Link>
            <Link
              href="https://github.com/stepanovcodes"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon sx={{ fontSize: 24 }} />
            </Link>
          </div>
        </Paper>

        <Paper variant="elevation" className="p-4 mb-4">
          <h2 className="text-2xl mb-2">About Child Hare</h2>
          <p className="text-justify">
            The Child Hare is a nimble companion with long ears, designed to
            assist you in discovering child care options for your kids in
            Alberta, Canada. This app is optimized for both small and desktop
            screens. With it, you can zoom into specific areas of interest,
            apply filters, search for child care facilities, and access detailed
            information, including Google reviews and photos.
          </p>
        </Paper>

        <Paper variant="elevation" className="p-4 mb-4">
          <h2 className="text-2xl mb-2">Our Mission</h2>
          <p className="text-justify">
            Our mission is to facilitate meaningful connections between parents
            and child care providers, helping them discover the best options
            while offering a seamless experience in the bustling realm of
            parenthood.
          </p>
        </Paper>
      </main>
    </div>
  );
};

export default AboutPage;
