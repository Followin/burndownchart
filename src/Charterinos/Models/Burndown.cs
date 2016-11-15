using System;
using System.Collections.Generic;

namespace Charterinos.Models
{
    public class Burndown
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public Dictionary<string, Dictionary<DateTime, int>> Series { get; set; }
    }
}