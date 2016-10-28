using System;
using System.Collections.Generic;

namespace Charterinos.Data
{
	public static class Data
	{
		public static Dictionary<string, Dictionary<DateTime, int>> Burndown => new Dictionary<string, Dictionary<DateTime, int>>
		{
			["First"] = new Dictionary<DateTime, int>
			{
				[DateTime.Now] = 15,
				[DateTime.Now.AddDays(5)] = 10,
				[DateTime.Now.AddDays(10)] = 5
			},

			["Second"] = new Dictionary<DateTime, int>
			{
				[DateTime.Now] = 12,
				[DateTime.Now.AddDays(3)] = 10,
				[DateTime.Now.AddDays(7)] = 3
			} 
		};
	}
}