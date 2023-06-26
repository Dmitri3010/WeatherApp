using NUnit.Framework;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeleniumTests.TestCases.SampleTests
{
	internal class OpenSite
	{
		IWebDriver driver = new ChromeDriver();

		[SetUp]
		public void SetUp()
		{
			driver.Navigate().GoToUrl("https://www.amazon.com/");
			driver.Manage().Window.Maximize();
			Thread.Sleep(2000);
		}

		[Test]
		public void OpenSiteTest()
		{
			IWebElement ele = driver.FindElement(By.Id("twotabsearchtextbox"));
			ele.SendKeys("something");
			Thread.Sleep(2000);
			Console.Write("add string to search\n");

			IWebElement searchButton = driver.FindElement(By.Id("nav-search-submit-button"));
			searchButton.Click();
			Console.Write("start search \n");
			Thread.Sleep(3000);
		}

		[TearDown]
		public void Close() { 
			driver.Close();
		}
	}
}
