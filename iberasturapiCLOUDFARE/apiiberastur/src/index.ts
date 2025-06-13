// Cloudflare Worker equivalent of your FastAPI app with TypeScript typing
// src/index.ts
/*
type SensorValue = {
	hmi_name: string;
	uds: string;
	value: number;
  };
  
  type CachedValues = {
	t1: SensorValue;
	t2: SensorValue;
	p1: SensorValue;
	p2: SensorValue;
	q1: SensorValue;
	q2: SensorValue;
	o2: SensorValue;
	rel_aire_gas: SensorValue;
	date: string;
	now: number;
	valve_state:number;
  };
  
  let cachedValues: CachedValues | null = null;
  let lastUpdateTime = 0;
  let valveState = 0;

  function generateNewValues(): void {
	const now = Date.now() / 1000;
	const date = new Date().toLocaleString("sv-SE", { timeZone: "Europe/Madrid" });
  
	cachedValues = {
	  t1: { hmi_name: "TT0601", uds: "ºC", value: Math.floor(Math.random() * 31) },
	  t2: { hmi_name: "TT0602", uds: "ºC", value: Math.floor(Math.random() * 31) },
	  p1: { hmi_name: "PT0601", uds: "mmwc", value: Math.floor(Math.random() * 401) + 100 },
	  p2: { hmi_name: "PT0602", uds: "mmwc", value: Math.floor(Math.random() * 51) + 550 },
	  q1: { hmi_name: "FT0601", uds: "Nm3/h", value: Math.floor(Math.random() * 11) + 10 },
	  q2: { hmi_name: "FT0602", uds: "Nm3/h", value: +(Math.random() * 0.5 + 2).toFixed(6) },
	  o2: { hmi_name: "OT0601", uds: "%", value: +(Math.random() * 4).toFixed(6) },
	  rel_aire_gas: { hmi_name: "relAireGas", uds: "None", value: +(Math.random() * 3.25 + 0.75).toFixed(6) },
	  date: date,
	  now: now,
	  valve_state:valveState
	};
	lastUpdateTime = now;
  }
  
 function corsResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Or use a specific domain
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
  
  export default {
	async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
	  const url = new URL(request.url);
  
	  if (url.pathname === "/api/simulate") {
		const now = Date.now() / 1000;
  
		if (cachedValues && (now - lastUpdateTime) <= 5) {
		  return new Response(JSON.stringify(cachedValues), {
			headers: { "Content-Type": "application/json" }
		  });
		} else {
		  generateNewValues();
		  return new Response(JSON.stringify(cachedValues), {
			headers: { "Content-Type": "application/json" }
		  });
		}
	  }
  
	  if (url.pathname === "/api/simulatelight") {
		valveState = Math.random() < 0.5 ? 0 : 1;
		return new Response(JSON.stringify({ valve_state: valveState }), {
		  headers: { "Content-Type": "application/json" }
		});
	  }

	  if (url.pathname === "/api/change_valve_state" && request.method === "POST") {
		let value: number | null = null;

		// First try to get value from query parameter
		const queryParam = url.searchParams.get("value");
		if (queryParam !== null) {
			value = Number(queryParam);
		} else {
			// Try reading from JSON body
			try {
			const body = await request.json();
			if (typeof (body as any).value === "number") {
			value = (body as any).value;
			}
			} catch (err) {
			return new Response(JSON.stringify({ success: false, error: "Invalid JSON body" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
			}
		}

		// Validate and apply the value
		if (value === 0 || value === 1) {
			valveState = value;
			return new Response(JSON.stringify({ success: true, valveState }), {
			headers: { "Content-Type": "application/json" }
			});
		} else {
			return new Response(JSON.stringify({ success: false, error: "Invalid value, must be 0 or 1" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
			});
		}
		}

	  
  
	  return new Response("Not Found", { status: 404 });
	}
  };
  */

  type SensorValue = {
  hmi_name: string;
  uds: string;
  value: number;
};

type CachedValues = {
  t1: SensorValue;
  t2: SensorValue;
  p1: SensorValue;
  p2: SensorValue;
  q1: SensorValue;
  q2: SensorValue;
  o2: SensorValue;
  rel_aire_gas: SensorValue;
  date: string;
  now: number;
  valve_state: number;
};

let cachedValues: CachedValues | null = null;
let lastUpdateTime = 0;
let valveState = 0;

function generateNewValues(): void {
  const now = Date.now() / 1000;
  const date = new Date().toLocaleString("sv-SE", { timeZone: "Europe/Madrid" });

  cachedValues = {
    t1: { hmi_name: "TT0601", uds: "ºC", value: Math.floor(Math.random() * 3) + 20 },
    t2: { hmi_name: "TT0602", uds: "ºC", value: Math.floor(Math.random() * 3) + 20 },
    p1: { hmi_name: "PT0601", uds: "mmwc", value: Math.floor(Math.random() * 401) + 100 },
    p2: { hmi_name: "PT0602", uds: "mmwc", value: Math.floor(Math.random() * 51) + 550 },
    q1: { hmi_name: "FT0601", uds: "Nm3/h", value: Math.floor(Math.random() * 11) + 10 },
    q2: { hmi_name: "FT0602", uds: "Nm3/h", value: +(Math.random() * 0.5 + 2).toFixed(6) },
    o2: { hmi_name: "OT0601", uds: "%", value: +(Math.random() * 4).toFixed(6) },
    rel_aire_gas: { hmi_name: "relAireGas", uds: "None", value: +(Math.random() * 3.25 + 0.75).toFixed(6) },
    date: date,
    now: now,
    valve_state: valveState
  };
  lastUpdateTime = now;
}

function corsResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (url.pathname === "/api/simulate") {
      const now = Date.now() / 1000;
      if (cachedValues && (now - lastUpdateTime) <= 5) {
        return corsResponse(JSON.stringify(cachedValues));
      } else {
        generateNewValues();
        return corsResponse(JSON.stringify(cachedValues));
      }
    }

    if (url.pathname === "/api/simulatelight") {
      valveState = Math.random() < 0.5 ? 0 : 1;
      return corsResponse(JSON.stringify({ valve_state: valveState }));
    }

    if (url.pathname === "/api/change_valve_state" && request.method === "POST") {
      let value: number | null = null;

      // Try getting value from URL query parameter
      const queryParam = url.searchParams.get("value");
      if (queryParam !== null) {
        value = Number(queryParam);
      } else {
        // Try getting value from JSON body
        try {
          const body = await request.json();
          if (typeof (body as any).value === "number") {
            value = (body as any).value;
          }
        } catch {
          return corsResponse(JSON.stringify({ success: false, error: "Invalid JSON body" }), 400);
        }
      }

      if (value === 0 || value === 1) {
        valveState = value;
        return corsResponse(JSON.stringify({ success: true, valveState }));
      } else {
        return corsResponse(JSON.stringify({ success: false, error: "Invalid value, must be 0 or 1" }), 400);
      }
    }

    return corsResponse(JSON.stringify({ error: "Not Found" }), 404);
  }
};
