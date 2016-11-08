using Microsoft.AspNetCore.Mvc;

namespace Charterinos.Controllers
{
	public class DataController : Controller
	{
		public IActionResult Burndown()
		{
			return Json(Data.Data.Burndown);
		}

		public IActionResult Epics()
		{
			return Json(Data.Data.Epics);
		}
		
	}
}