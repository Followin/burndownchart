using Microsoft.AspNetCore.Mvc;

namespace Charterinos.Controllers
{
	public class HomeController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		public IActionResult GetData()
		{
			return Json(Data.Data.Burndown);
		}
	}
}