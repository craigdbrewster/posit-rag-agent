// Posit Connect RAG Knowledge System - Enhanced with code examples

interface PositKnowledgeBase {
  [key: string]: string;
}

// Pre-loaded Posit Connect knowledge for government data analysts
const positKnowledge: PositKnowledgeBase = {
  "posit_connect_overview": "Posit Connect is a publishing platform for data science teams that allows you to deploy and share R and Python content including Shiny apps, R Markdown documents, Jupyter notebooks, APIs, dashboards, and more. It provides enterprise-grade security, scalability, and content management for government departments.",
  
  "python_best_practices": "For Python development in government departments: Use virtual environments, follow PEP 8 style guide, implement proper error handling, use type hints for better code documentation, and ensure secure coding practices. Popular libraries include pandas for data manipulation, matplotlib/plotly for visualization, and FastAPI for building APIs.",
  
  "r_best_practices": "R best practices for government data analysis: Use the tidyverse for data manipulation (dplyr, ggplot2), implement reproducible workflows with R Markdown, use version control with Git, follow consistent naming conventions, and document your functions properly. Consider using shiny for interactive applications and plumber for APIs.",
  
  "shiny_app_code": `Here's a basic Shiny application structure for Posit Connect:

# app.R
library(shiny)
library(ggplot2)
library(dplyr)

ui <- fluidPage(
  titlePanel("Government Data Dashboard"),
  
  sidebarLayout(
    sidebarPanel(
      selectInput("variable", "Choose a variable:",
                  choices = c("Population", "GDP", "Employment")),
      dateRangeInput("dates", "Date range:",
                     start = "2020-01-01", end = Sys.Date())
    ),
    
    mainPanel(
      plotOutput("mainPlot"),
      tableOutput("dataTable")
    )
  )
)

server <- function(input, output) {
  output$mainPlot <- renderPlot({
    # Your plotting code here
  })
  
  output$dataTable <- renderTable({
    # Your data processing code here
  })
}

shinyApp(ui = ui, server = server)`,
  
  "python_dashboard_code": `Python dashboard example using Streamlit for Posit Connect:

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# Configuration
st.set_page_config(
    page_title="Government Data Dashboard",
    page_icon="📊",
    layout="wide"
)

# Main dashboard
st.title("Government Data Analysis Dashboard")
st.markdown("---")

# Sidebar for controls
st.sidebar.header("Dashboard Controls")
department = st.sidebar.selectbox(
    "Select Department:",
    ["Department A", "Department B", "Department C", "Department D"]
)

date_range = st.sidebar.date_input(
    "Select Date Range:",
    value=[pd.to_datetime("2023-01-01"), pd.to_datetime("2024-01-01")]
)

# Main content
col1, col2 = st.columns(2)

with col1:
    st.subheader("Key Metrics")
    # Add your metrics here
    
with col2:
    st.subheader("Trend Analysis")
    # Add your charts here`,

  "r_markdown_code": `R Markdown template for government reports:

---
title: "Government Data Analysis Report"
author: "Data Analysis Team"
date: "\`r Sys.Date()\`"
output: 
  html_document:
    theme: united
    toc: true
    toc_float: true
    code_folding: hide
---

\`\`\`{r setup, include=FALSE}
knitr::opts_chunk$set(echo = TRUE, warning = FALSE, message = FALSE)

# Load required libraries
library(tidyverse)
library(knitr)
library(DT)
library(plotly)
\`\`\`

## Executive Summary

Brief overview of findings and recommendations.

## Data Analysis

\`\`\`{r data-analysis}
# Load and process your data
data <- read.csv("your_data.csv")

# Create visualizations
p <- ggplot(data, aes(x = variable1, y = variable2)) +
  geom_point() +
  theme_minimal() +
  labs(title = "Analysis Results")

ggplotly(p)
\`\`\`

## Conclusions

Key findings and next steps.`,

  "api_deployment_code": `Example API deployment for Posit Connect using plumber (R):

# plumber.R
library(plumber)
library(jsonlite)

#* @apiTitle Government Data API
#* @apiDescription API for accessing government datasets

#* Get department statistics
#* @param department The government department
#* @param year The year for data
#* @get /stats
function(department, year = 2024) {
  # Your data processing logic here
  result <- list(
    department = department,
    year = as.numeric(year),
    total_budget = 1000000,
    staff_count = 500
  )
  
  return(result)
}

#* Health check endpoint
#* @get /health
function() {
  list(status = "healthy", timestamp = Sys.time())
}

# To deploy: Save as plumber.R and publish to Posit Connect`
};

// Function to search Posit documentation for real-time information
const searchPositDocumentation = async (query: string): Promise<string | null> => {
  try {
    console.log('Searching for Posit Connect information:', query);
    return `I found your query about "${query}". Here are some helpful Posit Connect resources:

For the most current information, please visit:
• **Posit Connect User Guide**: https://docs.posit.co/connect/user/
• **Publishing Content**: https://docs.posit.co/connect/user/publishing/
• **R & Python Examples**: https://docs.posit.co/connect/user/content-types/
• **Administration Guide**: https://docs.posit.co/connect/admin/

For Python-specific guidance: https://docs.posit.co/connect/user/python/
For R-specific guidance: https://docs.posit.co/connect/user/r/`;
  } catch (error) {
    console.error('Error searching Posit documentation:', error);
    return null;
  }
};

// Enhanced RAG system that can fetch real-time Posit Connect information
export const processPositQuery = async (query: string, searchWeb = false): Promise<string> => {
  const queryLower = query.toLowerCase();
  
  // Check for code requests
  if (queryLower.includes('code') || queryLower.includes('snippet') || queryLower.includes('example')) {
    if (queryLower.includes('shiny') || queryLower.includes('app')) {
      return positKnowledge.shiny_app_code;
    }
    if (queryLower.includes('python') || queryLower.includes('streamlit') || queryLower.includes('dashboard')) {
      return positKnowledge.python_dashboard_code;
    }
    if (queryLower.includes('r markdown') || queryLower.includes('rmarkdown') || queryLower.includes('report')) {
      return positKnowledge.r_markdown_code;
    }
    if (queryLower.includes('api') || queryLower.includes('plumber')) {
      return positKnowledge.api_deployment_code;
    }
    
    return `Here are some common Posit Connect code patterns:

**Shiny App:** Basic structure for interactive R applications
**Python Dashboard:** Streamlit template for data visualization  
**R Markdown:** Professional reporting template
**API Deployment:** Plumber API example for data services

Ask specifically about "shiny code", "python dashboard", "R markdown template", or "API example" for detailed snippets.`;
  }
  
  // Check for direct matches in knowledge base
  for (const [key, value] of Object.entries(positKnowledge)) {
    if (queryLower.includes(key.replace('_', ' ')) || 
        queryLower.includes(key.split('_').join(' ')) ||
        value.toLowerCase().includes(queryLower.split(' ')[0])) {
      return value;
    }
  }
  
  // Check for specific topics
  if (queryLower.includes('posit connect') || queryLower.includes('publishing') || queryLower.includes('deployment')) {
    return positKnowledge.posit_connect_overview;
  }
  
  if (queryLower.includes('python') || queryLower.includes('streamlit') || queryLower.includes('jupyter')) {
    return positKnowledge.python_best_practices;
  }
  
  if (queryLower.includes('r ') || queryLower.includes('shiny') || queryLower.includes('tidyverse')) {
    return positKnowledge.r_best_practices;
  }
  
  if (queryLower.includes('training') || queryLower.includes('onboarding') || queryLower.includes('learning')) {
    return `Training resources for government data analysts:
    
**Python Training:**
- Start with pandas for data manipulation and matplotlib/seaborn for visualization
- Learn Jupyter notebooks for interactive analysis
- Practice with government datasets to build familiarity

**R Training:**
- Begin with tidyverse (dplyr, ggplot2) for data wrangling and visualization
- Learn R Markdown for reproducible reports
- Explore Shiny for interactive applications

**Posit Connect Training:**
- Understand content types (apps, reports, APIs)
- Learn deployment workflows and version control
- Practice with security and access controls

**Best Practices:**
- Version control with Git
- Code documentation and commenting
- Testing and validation procedures
- Data security and privacy considerations`;
  }
  
  // For implementation and how-to queries
  if (queryLower.includes('how') || queryLower.includes('implement') || queryLower.includes('build') || queryLower.includes('deploy')) {
    return `To build and deploy data applications on Posit Connect:

**1. Development Best Practices:**
- Use virtual environments (Python) or renv (R) for dependency management
- Write clean, documented code with proper error handling
- Test locally before deployment
- Follow government coding standards and security practices

**2. Content Types:**
- **Shiny Apps**: Interactive R applications for data exploration
- **Streamlit/Dash**: Python dashboards for data visualization
- **R Markdown/Jupyter**: Reports and documentation
- **APIs**: Data services using plumber (R) or FastAPI (Python)

**3. Deployment Process:**
- Connect your IDE to Posit Connect
- Use rsconnect or Python Connect packages
- Configure environment variables and secrets
- Set up proper access controls and permissions

**4. Monitoring & Maintenance:**
- Set up usage analytics and monitoring
- Regular updates and security patches  
- User feedback collection and iteration

For detailed guides, visit: https://docs.posit.co/connect/user/`;
  }
  
  // If we haven't found a good match and searchWeb is enabled, search for current info
  if (searchWeb) {
    try {
      const searchResults = await searchPositDocumentation(query);
      if (searchResults) {
        return searchResults;
      }
    } catch (error) {
      console.error('Error searching Posit documentation:', error);
    }
  }
  
  // Default helpful response
  return `I can help with Posit Connect and government data analysis questions including:

• **Posit Connect**: Deployment, publishing, and content management
• **Python Development**: Pandas, Streamlit, Jupyter, APIs with FastAPI
• **R Development**: Shiny, tidyverse, R Markdown, plumber APIs
• **Training & Onboarding**: Learning paths for Python, R, and Posit Connect
• **Best Practices**: Code standards, security, reproducibility
• **UX Patterns**: Dashboard design, user research, accessibility
• **Monitoring Tools**: Analytics, performance tracking, user insights

Try asking: "Show me Shiny code", "How do I deploy a Python dashboard?", "What are R best practices?", or "How do I create training materials?"

**Key Resources:**
- Posit Connect Documentation: https://docs.posit.co/connect/
- R Training: https://education.rstudio.com/
- Python for Data Science: https://www.python.org/about/gettingstarted/`;
};