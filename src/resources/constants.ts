export const baseLocation = ".neonWidget"
export const serverUrl = "https://neon-widget-back.onrender.com"
export const baseFont = "InterLight"
export const fonts = [
	"MADELikes",
	"RosaMarena",
	"Veles",
	"PFHandbookPro",
	"Nickainley",
	"StudioScriptCTT",
	"LDSlender",
	"Helvetica",
	"CitricaCyrillic",
	"BloggerSans",
	"Birch",
	"AmericanRetro",
]

export const colors = {
	Красный: "rgb(255,0,0)",
	Оранжевый: "rgb(255,165,0)",
	Фуксия: "rgb(255,0,255)",
	Розовый: "rgb(255,192,203)",
	Желтый: "rgb(255,235,0)",
	Лаймовый: "rgb(255,255,102)",
	Фиолетовый: "rgb(128, 0, 128)",
	Синий: "rgb(0,0,139)",
	Голубой: "rgb(173, 216, 230)",
	Зеленый: "rgb(50,205,50)",
	"Теплый белый": "rgb(253, 244, 220)",
	"Холодный белый": "rgb(244, 253, 255)",
}
export const colorScheme = {
	blue: "rgb(153, 204, 255)",
}

export const prices = {
	price1mm: 5,
	priceforElement: 150,
}

export const getPriceElement = () => {
	const data = JSON.parse(localStorage.getItem("data"))
	if (!data) {
		return prices.priceforElement
	}
	return data[0][1]
}
export const getPriceTextSize = () => {
	const data = JSON.parse(localStorage.getItem("data"))
	if (!data) {
		return prices.price1mm
	}
	return data[1][1]
}
export const getColors = () => {
	let response: any = {}
	const data = JSON.parse(localStorage.getItem("data"))
	if (!data) {
		return colors
	}

	data[2].map((col: string[], i: number) => {
		if (i != 0) {
			response[data[2][i]] = "rgb(" + data[3][i] + ")"
		}
	})
	return response
}

export const getDownloadName = () => {
	let response = ""
	const data = JSON.parse(localStorage.getItem("data"))
	if (!data) {
		return "neon-widget"
	}
	response = data[4][1]
	return response
}

export const getData = async () => {
	try {
		const controller = new AbortController()
		const timeout = setTimeout(() => {
			controller.abort() // Если время вышло, остановка запроса
		}, 3000) // Установка времени ожидания в 3 секунды

		const response = await fetch(serverUrl + "/data", {
			method: "GET",
			mode: "cors",
			signal: controller.signal, // Передача fetch-функции сигнала остановки
		})

		clearTimeout(timeout)

		if (response.ok) {
			const json = await response.json()
			console.log(json)
			localStorage.setItem("data", JSON.stringify(json))
		} else {
			console.error("Server responded with an error:", response.status)
		}
	} catch (error) {
		if (error.name === "AbortError") {
			console.error("Request timed out.")
		} else {
			console.error(error.message)
		}
	}
}
