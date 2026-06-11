import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import './Checkbox.css';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export default function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className="custom-checkbox-label">
      <input
        type="checkbox"
        className="custom-checkbox-input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className={`custom-checkbox-box ${checked ? 'checked' : ''}`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Check size={14} strokeWidth={3} className="custom-checkbox-icon" />
        </motion.div>
      </div>
      <span className="custom-checkbox-text">{label}</span>
    </label>
  );
}
