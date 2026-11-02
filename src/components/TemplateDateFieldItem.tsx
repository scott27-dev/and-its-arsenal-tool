import { useMemo, useState } from 'react';
import {
  formatDateToOrdinal,
  parseFormattedOrdinalDate,
} from '../utils/dateFormatter';

interface TemplateDateFieldItemProps {
  placeholderKey: string;
  label: string;
  icon: string;
  value: string;
  onChangeValue: (key: string, value: string) => void;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function TemplateDateFieldItem({
  placeholderKey,
  label,
  icon,
  value,
  onChangeValue,
}: TemplateDateFieldItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Parse initial view date from current value or today
  const activeDate = useMemo(() => {
    return parseFormattedOrdinalDate(value) || new Date();
  }, [value]);

  const [viewYear, setViewYear] = useState(() => activeDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => activeDate.getMonth());

  const daysInMonth = useMemo(() => {
    return new Date(viewYear, viewMonth + 1, 0).getDate();
  }, [viewYear, viewMonth]);

  const firstDayOfWeek = useMemo(() => {
    // 0 = Sunday, 1 = Monday... convert to Monday = 0
    const raw = new Date(viewYear, viewMonth, 1).getDay();
    return (raw + 6) % 7;
  }, [viewYear, viewMonth]);

  const today = useMemo(() => new Date(), []);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const selected = new Date(viewYear, viewMonth, day);
    onChangeValue(placeholderKey, formatDateToOrdinal(selected));
    setIsOpen(false);
  };

  const handleQuickSelect = (daysOffset: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysOffset);
    onChangeValue(placeholderKey, formatDateToOrdinal(target));
    setViewYear(target.getFullYear());
    setViewMonth(target.getMonth());
  };

  return (
    <div className="field">
      <div className="field-row">
        <div className="label-group">
          <span className="field-icon">{icon}</span>
          <span className="field-label">{label}</span>
        </div>
        <span className="token-badge">{`[${placeholderKey}]`}</span>
      </div>

      <button
        type="button"
        className={`trigger${isOpen ? ' open' : ''}${value ? ' has-value' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        data-testid="date-picker-trigger"
      >
        <span>{value || 'Select fixture date...'}</span>
        <span className="chevron">{isOpen ? '▲' : '▼'}</span>
      </button>

      <div className="quick-row">
        <button type="button" className="quick-btn" onClick={() => handleQuickSelect(0)} data-testid="quick-date-today">
          Today
        </button>
        <button type="button" className="quick-btn" onClick={() => handleQuickSelect(1)} data-testid="quick-date-tomorrow">
          Tomorrow
        </button>
        <button type="button" className="quick-btn" onClick={() => handleQuickSelect(7)} data-testid="quick-date-plus-7">
          +7 Days
        </button>
      </div>

      {isOpen && (
        <div className="calendar" data-testid="calendar-container">
          <div className="month-header">
            <button type="button" className="nav-btn" onClick={handlePrevMonth} data-testid="prev-month-button">
              ‹
            </button>
            <span className="month-title">{`${MONTHS[viewMonth]} ${viewYear}`}</span>
            <button type="button" className="nav-btn" onClick={handleNextMonth} data-testid="next-month-button">
              ›
            </button>
          </div>

          <div className="weekdays">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
              <span className="weekday" key={d}>
                {d}
              </span>
            ))}
          </div>

          <div className="days">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <span className="empty-day" key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected =
                activeDate.getDate() === day &&
                activeDate.getMonth() === viewMonth &&
                activeDate.getFullYear() === viewYear;
              const isCurrentDay =
                today.getDate() === day &&
                today.getMonth() === viewMonth &&
                today.getFullYear() === viewYear;

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  className={`day${isSelected ? ' selected' : isCurrentDay ? ' today' : ''}`}
                  onClick={() => handleSelectDay(day)}
                  data-testid={`calendar-day-${day}`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <input
            className="manual-input"
            value={value}
            onChange={e => onChangeValue(placeholderKey, e.target.value)}
            placeholder="Or type date, e.g. 16th October 2026..."
            data-testid="manual-date-input"
          />
        </div>
      )}
    </div>
  );
}
