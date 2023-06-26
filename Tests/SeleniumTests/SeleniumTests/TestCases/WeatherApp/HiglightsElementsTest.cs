using NUnit.Framework;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;

namespace SeleniumTests.TestCases.WeatherApp
{
	internal class HiglightsElementsTest
	{
		IWebDriver driver = new ChromeDriver();

		[SetUp]
		public void SetUp()
		{
			driver.Navigate().GoToUrl("http://127.0.0.1:5500/index.html");
			driver.Manage().Window.Maximize();
			Thread.Sleep(2000);
		}

		[Test]
		public void WeekCaroosel()
		{
			IEnumerable<IWebElement> highligthElems = driver.FindElements(By.ClassName("highliteBox"));
			Console.WriteLine($"ighlith elements count: {highligthElems.Count()}");
			Assert.IsTrue(highligthElems.Count() == 6);
		}

		[TearDown]
		public void TearDown()
		{
			driver.Close();
		}
	}
}
