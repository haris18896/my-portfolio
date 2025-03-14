import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { Octokit } from "@octokit/rest";

// ** Third Party Packages
import { Container } from "@mui/material";

function GitHub() {
    return (
        <Container maxWidth="xl">
            <Typography variant="h4">GitHub</Typography>
            <Typography variant="h4">My open source contributions and projects</Typography>

            <GitHubCalendar
              username="haris18896"
              colorScheme="dark"
              fontSize={12}
              blockSize={12}
            />
        </Container>
    )
}

export default GitHub;