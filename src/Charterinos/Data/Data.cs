using System;
using System.Collections.Generic;
using System.Linq;

namespace Charterinos.Data
{
	public static class Data
	{
		public static Dictionary<string, Dictionary<DateTime, int>> Burndown => new Dictionary<string, Dictionary<DateTime, int>>
		{
			["First"] = GetRandomDict(),
			["Second"] = GetRandomDict()
		};

		public static Random Random = new Random();

		public static Dictionary<DateTime, int> GetRandomDict()
		{
			var values = new List<int>();
			var dates = new List<DateTime>();
			for (var i = 0; i < 50; i++)
			{
				values.Add(Random.Next(1, 100));
				dates.Add(new DateTime(2016, Random.Next(1, 12), Random.Next(1,28)));
			}

			values = values.OrderByDescending(x => x).ToList();
			dates = dates.OrderBy(x => x).Distinct().ToList();

			var result = new Dictionary<DateTime, int>();

			for (var i = 0; i < Math.Min(values.Count, dates.Count); i++)
			{
				result.Add(dates[i], values[i]);
			}

			return result;
		}
	}
}