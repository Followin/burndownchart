﻿using System;
using System.Collections.Generic;
using System.Linq;
using Charterinos.Models;

namespace Charterinos.Data
{
	public static class Data
	{
		public static Burndown Burndown => new Burndown
		{
			StartDate = new DateTime(2016, 1, 1),
			EndDate = new DateTime(2016, 12, 31),
			Series = new Dictionary<string, Dictionary<DateTime, int>>
				{
					["First"] = GetRandomDict(),
					["Second"] = GetRandomDict()
				}
		};

		public static Dictionary<string, Epic> Epics => new Dictionary<string, Epic>
		{
			["First"] = new Epic
			{
				Done = Random.Next(1, 10),
				InProgress = Random.Next(1, 10),
				Crs = Random.Next(1, 10),
				ToDo = Random.Next(1, 10)
			},
			["Second"] = new Epic
			{
				Done = Random.Next(1, 10),
				InProgress = Random.Next(1, 10),
				Crs = Random.Next(1, 10),
				ToDo = Random.Next(1, 10)
			},
			["Third"] = new Epic
			{
				Done = Random.Next(1, 10),
				InProgress = Random.Next(1, 10),
				Crs = Random.Next(1, 10),
				ToDo = Random.Next(1, 10)
			},
			["Fourth"] = new Epic
			{
				Done = Random.Next(1, 10),
				InProgress = Random.Next(1, 10),
				Crs = Random.Next(1, 10),
				ToDo = Random.Next(1, 10)
			}
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