import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import { ru } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  // Фильтры (вещество)
  const [filters, setFilters] = useState([
    { label: 'CO', checked: false },
    { label: 'SO₂', checked: false },
    { label: 'NO₂', checked: false },
    { label: 'H₂S', checked: false },
    { label: 'O₃', checked: false },
  ])

  // Показатели
  const [indicators, setIndicators] = useState([
    { label: 'Температура', checked: false },
    { label: 'Давление', checked: false },
    { label: 'Влажность', checked: false },
    { label: 'Скорость ветра', checked: false },
    { label: 'Направление ветра', checked: false },
    { label: 'Условия рассеивания', checked: false },
    { label: 'МПРЗ', checked: false },
    { label: 'Всё', checked: false },
  ])

  const handleFilterChange = (index: number) => {
    setFilters((prev) =>
      prev.map((filter, i) =>
        i === index ? { ...filter, checked: !filter.checked } : filter,
      ),
    )
  }

  const handleIndicatorChange = (index: number) => {
    setIndicators((prev) =>
      prev.map((indicator, i) =>
        i === index ? { ...indicator, checked: !indicator.checked } : indicator,
      ),
    )
  }

  const handleResetIndicators = () => {
    setIndicators((prev) =>
      prev.map((indicator) => ({
        ...indicator,
        checked: false,
      })),
    )
  }

  // Дни недели
  const days = [
    { label: 'ПН', active: false },
    { label: 'ВТ', active: false },
    { label: 'СР', active: false },
    { label: 'ЧТ', active: false },
    { label: 'ПТ', active: false },
    { label: 'СБ', active: false },
    { label: 'ВС', active: false },
    { label: 'Всё', active: true },
  ]

  return (
    <div className="min-h-screen bg-[#F7F6FF] flex flex-col items-start pt-8 px-2 font-manrope">
      {/* Крупный заголовок */}
      <div className="pt-0 pb-8 pl-4 md:pl-20 text-[28px] md:text-[36px] font-bold uppercase text-[#333] text-left w-full">
        Локальный метеопрогноз
        <br />
        на основе реальных измерений
        <br />с метеостанций
      </div>

      {/* Фильтры */}
      <div className="w-full max-w-xl pl-4 md:pl-20 mb-8">
        <div className="text-[28px] md:text-[32px] font-bold text-[#333] leading-tight mb-4">
          Вещество
          <br />
          на постах мониторинга
        </div>
        <div className="bg-white rounded-2xl shadow flex flex-row items-center px-6 py-4 gap-4">
          {filters.map((f, index) => (
            <motion.label
              key={f.label}
              className="flex flex-row items-center gap-2 cursor-pointer select-none"
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="relative flex items-center justify-center"
                animate={{
                  backgroundColor: f.checked ? '#77B2D3' : 'white',
                }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="checkbox"
                  checked={f.checked}
                  onChange={() => handleFilterChange(index)}
                  className="peer appearance-none w-6 h-6 rounded-[5px] border border-[#77B2D3] checked:bg-[#77B2D3] checked:border-[#77B2D3]"
                />
                <motion.svg
                  className="absolute w-4 h-3 pointer-events-none"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: f.checked ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    d="M2 6.5L6.5 11L14 2"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.span>
              <span className="text-[18px] font-normal text-[#333]">
                {f.label}
              </span>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Блок Показатели */}
      <div className="w-full max-w-md pl-4 md:pl-20 mb-8">
        <div className="text-[28px] md:text-[32px] font-bold text-[#333] mb-4 font-manrope">
          Показатели
        </div>
        <div className="bg-white rounded-2xl shadow px-6 py-6 flex flex-col gap-4">
          {indicators.map((indicator, index) => (
            <motion.label
              key={indicator.label}
              className="flex items-center gap-3 cursor-pointer select-none"
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="relative flex items-center justify-center"
                animate={{
                  backgroundColor: indicator.checked ? '#77B2D3' : 'white',
                }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="checkbox"
                  checked={indicator.checked}
                  onChange={() => handleIndicatorChange(index)}
                  className="peer appearance-none w-6 h-6 rounded-[6px] border border-[#77B2D3] checked:bg-[#77B2D3] checked:border-[#77B2D3]"
                />
                <motion.svg
                  className="absolute w-4 h-3 pointer-events-none"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: indicator.checked ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    d="M2 6.5L6.5 11L14 2"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.span>
              <span className="text-[18px] text-[#333] font-normal font-manrope">
                {indicator.label}
              </span>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Календарь */}
      <CalendarBlock />

      {/* Основной блок с показателями и днями недели */}

      {/* Кнопки */}
      <div className="flex flex-row gap-6 mb-8">
        <motion.button
          className="bg-[#77B2D3] text-white text-[24px] md:text-[32px] font-bold uppercase rounded-full px-10 py-3 shadow-lg hover:bg-[#5a9bc7] transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          приМЕНИТЬ
        </motion.button>
        <motion.button
          className="bg-[#77B2D3] text-white text-[24px] md:text-[32px] font-bold uppercase rounded-full px-10 py-3 shadow-lg hover:bg-[#5a9bc7] transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleResetIndicators}
        >
          Сброс показателей
        </motion.button>
      </div>
    </div>
  )
}

function CalendarBlock() {
  const [range, setRange] = useState<DateRange | undefined>(undefined)

  // Форматирование дат для вывода
  const formatDate = (date: Date | undefined) =>
    date
      ? date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
      : ''

  // Кастомный caption для календаря (месяц/год и кнопки)
  function CustomCaption({
    displayMonth,
    goToMonth,
    nextMonth,
    previousMonth,
  }: any) {
    const month = displayMonth.toLocaleString('ru-RU', { month: 'long' })
    const year = displayMonth.getFullYear()
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#F3EAEA] text-[#222] rounded-full px-4 py-1 text-lg font-bold font-manrope select-none">
            {month.charAt(0).toUpperCase() + month.slice(1)}
          </span>
          <span className="text-[#222] text-lg font-bold font-manrope select-none ml-1">
            {year}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-[#F3F4FF] transition-colors text-[#1A32FA] text-2xl border border-[#F3F4FF]"
            onClick={() => previousMonth && goToMonth(previousMonth)}
            type="button"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-[#F3F4FF] transition-colors text-[#1A32FA] text-2xl border border-[#F3F4FF]"
            onClick={() => nextMonth && goToMonth(nextMonth)}
            type="button"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  // Кастомный Day-компонент для "пилюли" диапазона
  function CustomDay(props: any) {
    const { day, modifiers, className, style, ...rest } = props
    if (!(day instanceof Date) || modifiers.outside)
      return <div style={{ visibility: 'hidden', width: 56, height: 56 }} />
    const isStart = modifiers.range_start
    const isEnd = modifiers.range_end
    const isInRange = modifiers.range_middle
    const isSelected = modifiers.selected
    let extra = ''
    if (isInRange) extra = 'bg-[#F3F4FF] text-[#222] rounded-none'
    if (isStart) extra = 'bg-[#1A32FA] text-white rounded-full z-10'
    if (isEnd) extra = 'bg-[#1A32FA] text-white rounded-full z-10'
    if (isSelected && !isStart && !isEnd)
      extra = 'bg-[#1A32FA] text-white rounded-full z-10'
    if (!isInRange && !isStart && !isEnd && !isSelected)
      extra = 'bg-transparent text-[#222]'
    return (
      <button
        className={
          'w-14 h-14 flex items-center justify-center font-extrabold text-[22px] transition-all duration-200 hover:bg-[#eaf6fb] active:scale-95 ' +
          extra +
          ' ' +
          (className || '')
        }
        style={style}
        {...rest}
      >
        {day.getDate()}
      </button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        key="calendar-block"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
        className="bg-white rounded-3xl shadow-xl px-10 py-10 mb-12 min-w-[420px] max-w-2xl ml-4 md:ml-20 border border-[#f0f0f0]"
        style={{ boxShadow: '0 8px 32px 0 rgba(119,178,211,0.10)' }}
      >
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          locale={ru}
          weekStartsOn={1}
          fromYear={2020}
          toYear={2030}
          className="font-manrope"
          components={{ caption: CustomCaption, day: CustomDay }}
          modifiersClassNames={{
            today: 'border border-[#1A32FA] text-[#1A32FA] font-bold',
            outside: 'text-[#bbb] opacity-60',
          }}
          styles={{
            caption: { marginBottom: 0 },
            head_cell: {
              fontWeight: 700,
              color: '#333',
              fontSize: 16,
              textTransform: 'lowercase',
              paddingBottom: 8,
              width: 56,
              height: 56,
              textAlign: 'center',
              letterSpacing: '0.04em',
            },
            cell: { padding: 0 },
            table: { width: '100%' },
            row: {},
          }}
        />
        {/* Анимация выбранного диапазона */}
        <AnimatePresence mode="wait">
          {range && (range.from || range.to) && (
            <motion.div
              key={formatDate(range.from) + '-' + formatDate(range.to)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
              className="flex items-center gap-6 justify-center mt-8"
            >
              <div className="flex flex-col items-center">
                <div className="text-[32px] font-bold bg-[#E0E0E0] rounded-full px-7 py-2 font-manrope shadow-sm">
                  {range.from ? range.from.getDate() : '--'}
                </div>
                <div className="text-[#888] text-[16px] font-manrope">
                  {range.from
                    ? range.from.toLocaleString('ru-RU', { month: 'short' })
                    : ''}
                </div>
              </div>
              <span className="text-4xl text-[#bbb]">—</span>
              <div className="flex flex-col items-center">
                <div className="text-[32px] font-bold bg-[#E0E0E0] rounded-full px-7 py-2 font-manrope shadow-sm">
                  {range.to ? range.to.getDate() : '--'}
                </div>
                <div className="text-[#888] text-[16px] font-manrope">
                  {range.to
                    ? range.to.toLocaleString('ru-RU', { month: 'short' })
                    : ''}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
