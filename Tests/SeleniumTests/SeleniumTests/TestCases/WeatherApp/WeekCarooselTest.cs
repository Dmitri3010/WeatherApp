using NUnit.Framework;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;

namespace SeleniumTests.TestCases.WeatherApp
{
	internal class WeekCarooselTest
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
			IEnumerable<IWebElement> caroseelElements = driver.FindElements(By.ClassName("oneDayWeatherBox"));
			Console.WriteLine($"Elements count: {caroseelElements.Count()}");
			Assert.IsTrue(caroseelElements.Count() == 7);
		}

		[TearDown]
		public void TearDown()
		{
			driver.Close();
		}
	}
}
